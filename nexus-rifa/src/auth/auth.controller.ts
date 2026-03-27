import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }


  @Post('logout')
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  async logout(@Request() req) {
    // In a real-world application, you would typically blacklist the token
    // or handle session management on the server-side.
    return { message: 'Logged out successfully' };
  }
}
