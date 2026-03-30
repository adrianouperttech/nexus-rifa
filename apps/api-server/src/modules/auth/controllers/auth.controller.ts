import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Throttle } from '@nestjs/throttler'; // Correção: Importar Throttle

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Correção: Usar @Throttle e ajustar a sintaxe do limite
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req) {
    // A lógica de extração do tenant (ex: do subdomínio via req)
    // deve estar implementada no AuthService
    return this.authService.login(req, loginDto);
  }
}
