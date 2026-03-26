import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('tenants/:tenant_id/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Param('tenant_id') tenant_id: string,
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(tenant_id, loginDto);
  }
}
