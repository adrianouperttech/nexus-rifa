import { AdminAuthService } from '../services/admin-auth.service';
import { LoginDto } from '../../../auth/dto/login.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
