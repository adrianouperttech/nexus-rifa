import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class PlansService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    this.logger.log('Creating a new plan');
    const plan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    this.logger.log('Finding all plans');
    return this.planRepository.find();
  }

  async findOne(id: string): Promise<Plan> {
    this.logger.log(`Finding plan with id ${id}`);
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) {
      this.logger.warn(`Plan with ID "${id}" not found`);
      throw new NotFoundException(`Plan with ID \"${id}\" not found`);
    }
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    this.logger.log(`Updating plan with id ${id}`);
    const plan = await this.planRepository.preload({
      id: id,
      ...updatePlanDto,
    });
    if (!plan) {
      this.logger.warn(`Plan with ID "${id}" not found for update`);
      throw new NotFoundException(`Plan with ID \"${id}\" not found`);
    }
    return this.planRepository.save(plan);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing plan with id ${id}`);
    const result = await this.planRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Plan with ID "${id}" not found for removal`);
      throw new NotFoundException(`Plan with ID \"${id}\" not found`);
    }
  }
}
