import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rifa } from './entities/rifa.entity';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { PlansService } from '../plans/plans.service';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class RifasService {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @InjectRepository(Rifa)
    private readonly rifasRepository: Repository<Rifa>,
    private readonly plansService: PlansService,
  ) {}

  async create(tenant_id: string, createRifaDto: CreateRifaDto): Promise<Rifa> {
    this.logger.log(`Creating Rifa for tenant ${tenant_id}`);
    const rifa = this.rifasRepository.create({ ...createRifaDto, tenant_id });
    return this.rifasRepository.save(rifa);
  }

  async findAll(tenant_id: string): Promise<Rifa[]> {
    this.logger.log(`Finding all Rifas for tenant ${tenant_id}`);
    return this.rifasRepository.find({ where: { tenant_id } });
  }

  async findOne(tenant_id: string, id: string): Promise<Rifa> {
    this.logger.log(`Finding Rifa with id ${id} for tenant ${tenant_id}`);
    const rifa = await this.rifasRepository.findOne({
      where: { id, tenant_id },
    });
    if (!rifa) {
      this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}"`);
      throw new NotFoundException(`Rifa with ID \"${id}\" not found`);
    }
    return rifa;
  }

  async update(
    tenant_id: string,
    id: string,
    updateRifaDto: UpdateRifaDto,
  ): Promise<Rifa> {
    this.logger.log(`Updating Rifa with id ${id} for tenant ${tenant_id}`);
    const rifa = await this.rifasRepository.preload({
      id: id,
      tenant_id: tenant_id,
      ...updateRifaDto,
    });
    if (!rifa) {
      this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to update`);
      throw new NotFoundException(`Rifa with ID \"${id}\" not found`);
    }
    return this.rifasRepository.save(rifa);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    this.logger.log(`Removing Rifa with id ${id} for tenant ${tenant_id}`);
    const result = await this.rifasRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to remove`);
      throw new NotFoundException(`Rifa with ID \"${id}\" not found`);
    }
  }
}
