import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RootUsersService } from '../../root-users/root-users.service';
import { LoginDto } from '../../auth/dto/login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly rootUsersService: RootUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const rootUser = await this.rootUsersService.findByEmail(email);

    if (!rootUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      rootUser.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: rootUser.id, email: rootUser.email, is_root: true };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
