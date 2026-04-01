import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(req: Request, loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
