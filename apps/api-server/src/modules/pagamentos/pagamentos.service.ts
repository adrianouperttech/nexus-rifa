import {
  Injectable,
  ConflictException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { ReservasService } from '../reservas/reservas.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class PagamentosService {
  private readonly mercadopago;

  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    @Inject(forwardRef(() => ReservasService))
    private readonly reservasService: ReservasService,
  ) {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      this.logger.error(
        'Chave de acesso do Mercado Pago não foi configurada (MERCADOPAGO_ACCESS_TOKEN).',
      );
      throw new InternalServerErrorException(
        'Chave de acesso do Mercado Pago não foi configurada (MERCADOPAGO_ACCESS_TOKEN).',
      );
    }
    this.mercadopago = new MercadoPagoConfig({ accessToken });
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
      throw new ConflictException(
        `Já existe um pagamento pendente para a reserva ${reserva_id}.`,
      );
    }

    const payment = new Payment(this.mercadopago);

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30);

    try {
      const paymentResponse = await payment.create({
        body: {
          transaction_amount: reserva.rifa.valor_cota, // CORRIGIDO
          description: `Pagamento da reserva para a rifa \"${reserva.rifa.titulo}\"`,
          payment_method_id: 'pix',
          date_of_expiration: expirationDate.toISOString(),
          payer: {
            email: reserva.email, // CORRIGIDO
            first_name: reserva.nome.split(' ')[0], // CORRIGIDO
            last_name: reserva.nome.split(' ').slice(1).join(' ') || undefined, // CORRIGIDO
            // A propriedade CPF não existe na entidade Reserva, removida por enquanto
            // identification: {
            //   type: 'CPF',
            //   number: reserva.cpf.replace(/\D/g, ''),
            // },
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
      const qr_code_data =
        paymentResponse.point_of_interaction.transaction_data?.qr_code;
      const qr_code_base64 =
        paymentResponse.point_of_interaction.transaction_data?.qr_code_base64;

      if (!qr_code_data || !qr_code_base64) {
        throw new InternalServerErrorException(
          'Falha ao obter os dados do QR Code do gateway de pagamento.',
        );
      }

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
        qr_code_data,
        qr_code_base64,
      };
    } catch (error) {
      this.logger.error('Erro ao criar pagamento no Mercado Pago:', error);
      throw new InternalServerErrorException(
        'Falha ao se comunicar com o gateway de pagamento.',
      );
    }
  }

  async handlePagamentoWebhook(notification: any): Promise<void> {
    if (
      notification.type === 'payment' &&
      notification.data &&
      notification.data.id
    ) {
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
          this.logger.warn(
            `Pagamento com transacao_id \"${transacao_id}\" não encontrado.`,
          );
          return;
        }

        if (pagamento.status !== 'pendente') {
          this.logger.log(
            `Webhook recebido para pagamento ${pagamento.id} que não está pendente.`,
          );
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
            return;
        }

        pagamento.status = novoStatus;
        await this.pagamentoRepository.save(pagamento);

        await this.reservasService.updateStatus(
          pagamento.reserva.tenant_id,
          pagamento.reserva_id,
          novoStatusReserva,
        );
      } catch (error) {
        this.logger.error('Erro ao processar webhook do Mercado Pago:', error);
        throw new InternalServerErrorException(
          'Erro ao consultar status do pagamento no gateway.',
        );
      }
    }
  }
}
