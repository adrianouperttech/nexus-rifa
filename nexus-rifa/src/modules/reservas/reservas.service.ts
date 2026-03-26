import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @Inject(forwardRef(() => RifasService))
    private readonly rifasService: RifasService,

    private readonly emailService: EmailService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async create(
    createReservaDto: CreateReservaDto,
    tenant_id: string,
  ): Promise<Reserva> {
    const { rifa_id, numero, cliente_email, cliente_whatsapp } =
      createReservaDto;

    const rifa = await this.rifasService.findOne(tenant_id, rifa_id);

    if (numero > rifa.limit) {
      throw new ConflictException(
        `O número ${numero} está acima do limite de ${rifa.limit} da rifa.`,
      );
    }

    const existingReserva = await this.reservaRepository.findOne({
      where: { rifa_id, numero },
    });

    if (existingReserva) {
      throw new ConflictException(
        `O número ${numero} já está reservado para esta rifa.`,
      );
    }

    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      tenant_id,
      status: 'disponivel',
    });
    const savedReserva = await this.reservaRepository.save(reserva);

    await this.emailService.send(
      cliente_email,
      'Reserva Realizada',
      `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`,
    );
    await this.whatsappService.send(
      cliente_whatsapp,
      `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`,
    );

    return savedReserva;
  }

  async findAll(tenant_id: string): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: { tenant_id },
      relations: ['rifa'],
    });
  }

  async findByStatus(status: string): Promise<Reserva[]> {
    return this.reservaRepository.find({ where: { status } });
  }

  async findOne(tenant_id: string, id: string): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id, tenant_id },
      relations: ['rifa'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva with ID "${id}" not found`);
    }
    return reserva;
  }

  async update(
    tenant_id: string,
    id: string,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    const reserva = await this.reservaRepository.preload({
      id: id,
      tenant_id: tenant_id,
      ...updateReservaDto,
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva with ID "${id}" not found`);
    }
    return this.reservaRepository.save(reserva);
  }

  async updateStatus(
    tenant_id: string,
    id: string,
    status: string,
  ): Promise<Reserva> {
    const reserva = await this.findOne(tenant_id, id);
    reserva.status = status;
    return this.reservaRepository.save(reserva);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    const result = await this.reservaRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      throw new NotFoundException(`Reserva with ID "${id}" not found`);
    }
  }
}
