import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service';
import { LoginDto } from '../../../auth/dto/login.dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminAuthService.login(loginDto);
  }
}
