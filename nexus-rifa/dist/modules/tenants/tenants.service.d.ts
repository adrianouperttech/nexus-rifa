import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
export declare class TenantsService {
    private readonly tenantRepository;
    constructor(tenantRepository: Repository<Tenant>);
    findByEmail(email: string): Promise<Tenant>;
}
