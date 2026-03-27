import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { ReservasService } from '../reservas/reservas.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PagamentosService {
  private readonly mercadopago;

  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    @Inject(forwardRef(() => ReservasService))
    private readonly reservasService: ReservasService,
  ) {
    this.mercadopago = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });
  }

  async create(
    tenant_id: string,
    createPagamentoDto: CreatePagamentoDto,
  ): Promise<any> {
    const { reserva_id } = createPagamentoDto;
    const reserva = await this.reservasService.findOne(tenant_id, reserva_id);

    if (reserva.status !== 'disponivel') {
      throw new ConflictException(
        `Reserva ${reserva_id} não está disponível para pagamento.`,
      );
    }

    const existingPagamento = await this.pagamentoRepository.findOne({
      where: { reserva_id, status: 'pendente' },
    });

    if (existingPagamento) {
      // Aqui você pode decidir retornar o pagamento existente em vez de criar um novo
      // Por enquanto, vamos lançar um erro para evitar duplicatas.
      throw new ConflictException(
        `Já existe um pagamento pendente para a reserva ${reserva_id}.`,
      );
    }

    // --- Integração com Gateway de Pagamento PIX (Mercado Pago) ---
    const payment = new Payment(this.mercadopago);

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30); // QR Code expira em 30 minutos

    try {
      const paymentResponse = await payment.create({
        body: {
          transaction_amount: reserva.rifa.preco,
          description: `Pagamento da reserva para a rifa "${reserva.rifa.titulo}"`, // Adicionado para clareza
          payment_method_id: 'pix',
          date_of_expiration: expirationDate.toISOString(),
          payer: {
            email: reserva.comprador.email,
            first_name: reserva.comprador.nome.split(' ')[0], // Pega o primeiro nome
            last_name: reserva.comprador.nome.split(' ').slice(1).join(' ') || undefined, // Pega o sobrenome
            identification: {
              type: 'CPF',
              number: reserva.comprador.cpf.replace(/\D/g, ''), // Remove formatação do CPF
            },
          },
          notification_url: `${process.env.APP_URL}/pagamentos/webhook`,
        },
      });

      if (!paymentResponse.id || !paymentResponse.point_of_interaction) {
        throw new InternalServerErrorException(
          'Falha ao criar pagamento PIX: resposta inválida do gateway.',
        );
      }

      const transacao_id = String(paymentResponse.id);
      const qr_code_data = paymentResponse.point_of_interaction.transaction_data.qr_code;
      const qr_code_base64 = paymentResponse.point_of_interaction.transaction_data.qr_code_base64;

      const novoPagamento = this.pagamentoRepository.create({
        reserva_id,
        status: 'pendente',
        gateway_pagamento: 'mercadopago',
        transacao_id,
      });
      await this.pagamentoRepository.save(novoPagamento);

      await this.reservasService.updateStatus(
        tenant_id,
        reserva_id,
        'pendente',
      );

      return {
        message: 'Pagamento PIX criado. Aguardando pagamento.',
        transacao_id,
        qr_code_data, // Link para o QR Code
        qr_code_base64, // QR Code em Base64 para exibir na tela
      };
    } catch (error) {
      console.error('Erro ao criar pagamento no Mercado Pago:', error);
      throw new InternalServerErrorException(
        'Falha ao se comunicar com o gateway de pagamento.',
      );
    }
  }

  async handlePagamentoWebhook(
    notification: any,
  ): Promise<void> {
    // O webhook do Mercado Pago notifica sobre o tópico 'payment'
    if (notification.type === 'payment' && notification.data && notification.data.id) {
      const paymentId = notification.data.id;
      const payment = new Payment(this.mercadopago);

      try {
        const paymentInfo = await payment.get({ id: paymentId });

        const transacao_id = String(paymentInfo.id);
        const pagamento = await this.pagamentoRepository.findOne({
          where: { transacao_id },
          relations: ['reserva'],
        });

        if (!pagamento) {
          console.warn(`Pagamento com transacao_id "${transacao_id}" não encontrado.`);
          return; // Retorna 200 OK para o MP não reenviar
        }

        if (pagamento.status !== 'pendente') {
          console.log(`Webhook recebido para pagamento ${pagamento.id} que não está pendente.`);
          return;
        }

        let novoStatus: 'pago' | 'cancelado';
        let novoStatusReserva: 'confirmada' | 'disponivel' | 'pendente';

        switch (paymentInfo.status) {
          case 'approved':
          case 'confirmed':
            novoStatus = 'pago';
            novoStatusReserva = 'confirmada';
            break;
          case 'cancelled':
          case 'expired':
            novoStatus = 'cancelado';
            novoStatusReserva = 'disponivel';
            break;
          default:
            // Ignora outros status como 'in_process', etc.
            return;
        }

        pagamento.status = novoStatus;
        await this.pagamentoRepository.save(pagamento);

        await this.reservasService.updateStatus(
          pagamento.reserva.tenant_id,
          pagamento.reserva_id,
          novoStatusReserva
        );
      } catch (error) {
        console.error('Erro ao processar webhook do Mercado Pago:', error);
        // Lançar um erro aqui faria o MP tentar reenviar, o que pode ser útil
        throw new InternalServerErrorException('Erro ao consultar status do pagamento no gateway.');
      }
    }
  }
}
