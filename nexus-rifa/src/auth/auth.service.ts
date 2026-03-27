import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(email);
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles }; // Add roles to payload
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '60m' }),
      refresh_token: this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }),
    };
  }

  async refreshToken(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '60m' }),
    };
  }
}
