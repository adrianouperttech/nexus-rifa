import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Tenant } from '../../modules/tenants/entities/tenant.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Rifa } from '../../modules/rifas/entities/rifa.entity';
import { Cota } from '../../modules/cotas/entities/cota.entity';
export declare class TestDataSeeder implements Seeder {
    private readonly tenantRepository;
    private readonly userRepository;
    private readonly rifaRepository;
    private readonly cotaRepository;
    constructor(tenantRepository: Repository<Tenant>, userRepository: Repository<User>, rifaRepository: Repository<Rifa>, cotaRepository: Repository<Cota>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
