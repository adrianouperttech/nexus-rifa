import { Repository } from 'typeorm';
import { RootUser } from './entities/root-user.entity';
export declare class RootUsersService {
    private readonly rootUserRepository;
    constructor(rootUserRepository: Repository<RootUser>);
    findByEmail(email: string): Promise<RootUser | undefined>;
}
