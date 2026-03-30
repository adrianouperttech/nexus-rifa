import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ThrottlerLimit } from '@nestjs/throttler';

@Controller('auth') // Rota padronizada
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ThrottlerLimit({ ttl: 60000, limit: 10 }) // 10 requisições por minuto
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req) {
    // O tenant_id será determinado pelo subdomínio ou outro método no AuthService
    return this.authService.login(loginDto, req);
  }
}
