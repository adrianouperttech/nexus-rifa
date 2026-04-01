import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(req: any, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(req: any): Promise<import("./entities/user.entity").User[]>;
    findOne(req: any, id: string): Promise<import("./entities/user.entity").User>;
    update(req: any, id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(req: any, id: string): Promise<void>;
}
