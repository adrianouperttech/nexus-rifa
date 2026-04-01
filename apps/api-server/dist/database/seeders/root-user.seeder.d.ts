import { RootUser } from '../../modules/root-users/entities/root-user.entity';
import { Repository } from 'typeorm';
export declare class RootUserSeeder {
    private readonly rootUserRepository;
    constructor(rootUserRepository: Repository<RootUser>);
    run(): Promise<any>;
}
