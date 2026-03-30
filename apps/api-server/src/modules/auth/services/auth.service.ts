import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express'; // Importar o tipo Request

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    @Req() req: Request, // Recebe a requisição completa
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    const tenant_id = req.subdomains.length > 0 ? req.subdomains[0] : null;
    if (!tenant_id) {
      throw new UnauthorizedException('Tenant não identificado.');
    }

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
      tenant_id: user.tenant_id, // tenant_id já está no usuário
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
