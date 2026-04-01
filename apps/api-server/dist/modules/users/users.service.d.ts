import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from '../../common/logger/logger.service';
export declare class UsersService {
    private readonly logger;
    private readonly userRepository;
    constructor(logger: LoggerService, userRepository: Repository<User>);
    create(tenant_id: string, createUserDto: CreateUserDto): Promise<User>;
    findAll(tenant_id: string): Promise<User[]>;
    findOne(tenant_id: string, id: string): Promise<User>;
    findByEmail(tenant_id: string, email: string): Promise<User>;
    update(tenant_id: string, id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(tenant_id: string, id: string): Promise<void>;
}
