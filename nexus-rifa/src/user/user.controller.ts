import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have a JwtAuthGuard

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }

  @Post()
  async create(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }
}
