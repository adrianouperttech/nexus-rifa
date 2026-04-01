import { UsersService } from '../../users/users.service';
import { TenantsService } from '../../tenants/tenants.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';
import { LoggerService } from '../../../common/logger/logger.service';
export declare class AuthService {
    private readonly logger;
    private readonly usersService;
    private readonly tenantsService;
    private readonly jwtService;
    constructor(logger: LoggerService, usersService: UsersService, tenantsService: TenantsService, jwtService: JwtService);
    login(req: Request, loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
