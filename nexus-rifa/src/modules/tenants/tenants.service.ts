import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async findByEmail(email: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { email } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with email "${email}" not found`);
    }
    return tenant;
  }
}
