import { JwtService } from '@nestjs/jwt';
import { RootUsersService } from '../../../root-users/root-users.service';
import { LoginDto } from '../../../auth/dto/login.dto';
export declare class AdminAuthService {
    private readonly rootUsersService;
    private readonly jwtService;
    constructor(rootUsersService: RootUsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
