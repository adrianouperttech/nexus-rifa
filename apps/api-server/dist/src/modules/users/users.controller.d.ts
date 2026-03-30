import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(tenant_id: string, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(tenant_id: string): Promise<import("./entities/user.entity").User[]>;
    findOne(tenant_id: string, id: string): Promise<import("./entities/user.entity").User>;
    findByEmail(tenant_id: string, email: string): Promise<import("./entities/user.entity").User>;
    update(tenant_id: string, id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(tenant_id: string, id: string): Promise<void>;
}
