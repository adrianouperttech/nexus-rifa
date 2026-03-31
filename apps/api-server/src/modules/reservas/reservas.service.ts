import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class ReservasService {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    private readonly connection: Connection,

    @Inject(forwardRef(() => RifasService))
    private readonly rifasService: RifasService,

    private readonly emailService: EmailService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async create(
    createReservaDto: CreateReservaDto,
    tenant_id: string,
  ): Promise<Reserva> {
    const { rifa_id, numero, email, whatsapp } = createReservaDto;
    this.logger.log(`Creating reservation for Rifa ${rifa_id}, number ${numero}, tenant ${tenant_id}`);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const rifa = await this.rifasService.findOne(tenant_id, rifa_id);

      if (numero > rifa.limite) {
        throw new ConflictException(
          `O número ${numero} está acima do limite de ${rifa.limite} da rifa.`,
        );
      }

      const existingReserva = await queryRunner.manager.findOne(Reserva, {
        where: { rifa_id, numero },
        lock: { mode: 'pessimistic_write' },
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
      const savedReserva = await queryRunner.manager.save(reserva);

      await this.emailService.send(
        email,
        `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`,
      );
      await this.whatsappService.send(
        whatsapp,
        `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`,
      );

      await queryRunner.commitTransaction();
      this.logger.log(`Reservation created successfully for Rifa ${rifa_id}, number ${numero}`);

      return savedReserva;
    } catch (err) {
      this.logger.error(`Error creating reservation: ${err}`);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(tenant_id: string): Promise<Reserva[]> {
    this.logger.log(`Finding all reservations for tenant ${tenant_id}`);
    return this.reservaRepository.find({
      where: { tenant_id },
      relations: ['rifa'],
    });
  }

  async findOne(tenant_id: string, id: string): Promise<Reserva> {
    this.logger.log(`Finding reservation with id ${id} for tenant ${tenant_id}`);
    const reserva = await this.reservaRepository.findOne({
      where: { id, tenant_id },
      relations: ['rifa'],
    });
    if (!reserva) {
      this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}"`);
      throw new NotFoundException(`Reserva with ID \"${id}\" not found`);
    }
    return reserva;
  }

  async update(
    tenant_id: string,
    id: string,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    this.logger.log(`Updating reservation with id ${id} for tenant ${tenant_id}`);
    const reserva = await this.reservaRepository.preload({
      id: id,
      tenant_id: tenant_id,
      ...updateReservaDto,
    });
    if (!reserva) {
      this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}" to update`);
      throw new NotFoundException(`Reserva with ID \"${id}\" not found`);
    }
    return this.reservaRepository.save(reserva);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    this.logger.log(`Removing reservation with id ${id} for tenant ${tenant_id}`);
    const result = await this.reservaRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}" to remove`);
      throw new NotFoundException(`Reserva with ID \"${id}\" not found`);
    }
  }

  async findByStatus(tenant_id: string, status: string): Promise<Reserva[]> {
    this.logger.log(`Finding reservations with status ${status} for tenant ${tenant_id}`);
    return this.reservaRepository.find({ where: { tenant_id, status } });
  }

  async updateStatus(tenant_id: string, id: string, status: string): Promise<Reserva> {
    this.logger.log(`Updating status of reservation with id ${id} to ${status} for tenant ${tenant_id}`);
    const reserva = await this.findOne(tenant_id, id);
    reserva.status = status;
    return this.reservaRepository.save(reserva);
  }
}
