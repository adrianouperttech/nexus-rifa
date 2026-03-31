import { Injectable, UnauthorizedException, Req, Inject } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express'; // Importar o tipo Request
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    @Req() req: Request, // Recebe a requisição completa
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    const tenant_id = req.subdomains.length > 0 ? req.subdomains[0] : null;
    this.logger.info(`Login attempt for tenant ${tenant_id}`);
    if (!tenant_id) {
      this.logger.warn('Login attempt without tenant');
      throw new UnauthorizedException('Tenant não identificado.');
    }

    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(tenant_id, email);

    if (!user) {
      this.logger.warn(`Login failed for email "${email}" in tenant "${tenant_id}" - User not found`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      this.logger.warn(`Login failed for email "${email}" in tenant "${tenant_id}" - Invalid password`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      tenant_id: user.tenant_id, // tenant_id já está no usuário
    };

    this.logger.info(`Login successful for user ${user.id} in tenant ${tenant_id}`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
