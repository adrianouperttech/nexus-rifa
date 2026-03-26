import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    tenant_id: string,
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(tenant_id, email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      tenant_id: user.tenant_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
