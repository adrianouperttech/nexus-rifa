import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rifa } from './entities/rifa.entity';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { BillingService } from '../billing/billing.service'; // Correção: Importar BillingService
import { PlansService } from '../plans/plans.service';

@Injectable()
export class RifasService {
  constructor(
    @InjectRepository(Rifa)
    private readonly rifasRepository: Repository<Rifa>,
    private readonly billingService: BillingService, // Correção: Usar BillingService
    private readonly plansService: PlansService,
  ) {}

  async create(tenant_id: string, createRifaDto: CreateRifaDto): Promise<Rifa> {
    // Correção: Usar billingService e o método correto findSubscriptionByTenantId
    const subscription = await this.billingService.findSubscriptionByTenantId(
      tenant_id,
    );

    if (!subscription || subscription.status !== 'authorized') {
      throw new ForbiddenException('No active subscription found.');
    }

    const plan = await this.plansService.findOne(subscription.plan_id);
    if (!plan) {
      throw new NotFoundException(
        `Plan with ID "${subscription.plan_id}" not found`,
      );
    }

    const count = await this.rifasRepository.count({ where: { tenant_id } });
    if (count >= plan.limit) {
      throw new ForbiddenException('Raffle limit reached.');
    }

    const rifa = this.rifasRepository.create({ ...createRifaDto, tenant_id });
    return this.rifasRepository.save(rifa);
  }

  async findAll(tenant_id: string): Promise<Rifa[]> {
    return this.rifasRepository.find({ where: { tenant_id } });
  }

  async findOne(tenant_id: string, id: string): Promise<Rifa> {
    const rifa = await this.rifasRepository.findOne({
      where: { id, tenant_id },
    });
    if (!rifa) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
    return rifa;
  }

  async update(
    tenant_id: string,
    id: string,
    updateRifaDto: UpdateRifaDto,
  ): Promise<Rifa> {
    const rifa = await this.rifasRepository.preload({
      id: id,
      tenant_id: tenant_id,
      ...updateRifaDto,
    });
    if (!rifa) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
    return this.rifasRepository.save(rifa);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    const result = await this.rifasRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
  }
}
