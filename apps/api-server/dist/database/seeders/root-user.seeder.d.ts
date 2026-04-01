import { Seeder } from 'nestjs-seeder';
import { RootUser } from '../../modules/root-users/entities/root-user.entity';
import { Repository } from 'typeorm';
export declare class RootUserSeeder implements Seeder {
    private readonly rootUserRepository;
    constructor(rootUserRepository: Repository<RootUser>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
