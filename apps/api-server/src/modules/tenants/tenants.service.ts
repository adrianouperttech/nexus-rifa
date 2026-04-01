import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class TenantsService {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    this.logger.log('Creating a new tenant');
    const tenant = this.tenantRepository.create(createTenantDto);
    return this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    this.logger.log('Finding all tenants');
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    this.logger.log(`Finding tenant with id ${id}`);
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      this.logger.warn(`Tenant with ID "${id}" not found`);
      throw new NotFoundException(`Tenant with ID \"${id}\" not found`);
    }
    return tenant;
  }

  async findByNameOrEmail(identifier: string): Promise<Tenant> {
    this.logger.log(`Finding tenant by name or email: ${identifier}`);
    const tenant = await this.tenantRepository.findOne({
      where: [{ nome: identifier }, { email: identifier }],
    });
    if (!tenant) {
      this.logger.warn(`Tenant with identifier "${identifier}" not found`);
      throw new NotFoundException(
        `Tenant with identifier "${identifier}" not found`,
      );
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    this.logger.log(`Updating tenant with id ${id}`);
    const tenant = await this.tenantRepository.preload({
      id: id,
      ...updateTenantDto,
    });
    if (!tenant) {
      this.logger.warn(`Tenant with ID "${id}" not found for update`);
      throw new NotFoundException(`Tenant with ID \"${id}\" not found`);
    }
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing tenant with id ${id}`);
    const result = await this.tenantRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Tenant with ID "${id}" not found for removal`);
      throw new NotFoundException(`Tenant with ID \"${id}\" not found`);
    }
  }
}
