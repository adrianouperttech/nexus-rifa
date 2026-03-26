import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(tenant_id: string, loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
