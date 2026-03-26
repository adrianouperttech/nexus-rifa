import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { ReservasService } from '../reservas/reservas.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    @Inject(forwardRef(() => ReservasService))
    private readonly reservasService: ReservasService,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<any> {
    const { reserva_id } = createPagamentoDto;
    const reserva = await this.reservasService.findOne(reserva_id);

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

    // --- Simulação da Integração com Gateway de Pagamento PIX ---
    const transacao_id = uuidv4();
    const qr_code_data = `https://pix.example.com/charge/${transacao_id}`;

    const pagamento = this.pagamentoRepository.create({
      reserva_id,
      status: 'pendente',
      gateway_pagamento: 'gateway-simulado',
      transacao_id,
    });
    await this.pagamentoRepository.save(pagamento);

    await this.reservasService.updateStatus(reserva_id, 'pendente');

    // Em um app real, você retornaria os dados para o frontend renderizar o QR Code
    return {
      message: 'Pagamento PIX criado. Aguardando pagamento.',
      transacao_id,
      qr_code_data,
    };
  }

  async handlePagamentoWebhook(
    transacao_id: string,
    status: 'pago' | 'cancelado',
  ): Promise<void> {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { transacao_id },
    });
    if (!pagamento) {
      throw new NotFoundException(
        `Pagamento com transacao_id "${transacao_id}" não encontrado.`,
      );
    }

    if (pagamento.status !== 'pendente') {
      // Pode ser um webhook duplicado, apenas ignoramos.
      console.log(
        `Webhook recebido para pagamento ${pagamento.id} que não está pendente.`,
      );
      return;
    }

    pagamento.status = status;
    await this.pagamentoRepository.save(pagamento);

    await this.reservasService.updateStatus(pagamento.reserva_id, status);
  }
}
