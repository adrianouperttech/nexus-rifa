import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express'; // Importar o tipo Request
import { LoggerService } from '../../../common/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    @Req() req: Request, // Recebe a requisição completa
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    const tenant_id =
      req.subdomains && req.subdomains.length > 0
        ? req.subdomains[0]
        : loginDto.tenant_id;

    this.logger.log(`Login attempt for tenant ${tenant_id}`);
    if (!tenant_id) {
      this.logger.warn('Login attempt without tenant');
      throw new UnauthorizedException(
        'Tenant não identificado. Informe tenant_id.',
      );
    }

    const { email, password } = loginDto;

    try {
      const user = await this.usersService.findByEmail(tenant_id, email);

      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
        this.logger.warn(
          `Login failed for email \"${email}\" in tenant \"${tenant_id}\" - Invalid password`,
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        tenant_id: user.tenant_id,
      };

      this.logger.log(
        `Login successful for user ${user.id} in tenant ${tenant_id}`,
      );

      try {
        return {
          access_token: this.jwtService.sign(payload),
        };
      } catch (error) {
        this.logger.error('Falha ao assinar token JWT:', error);
        throw new InternalServerErrorException('Erro interno de autenticação');
      }
    } catch (error) {
      this.logger.error('Login error:', error);

      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      throw new InternalServerErrorException('Erro interno de autenticação');
    }
  }
}
