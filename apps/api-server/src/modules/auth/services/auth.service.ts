import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { TenantsService } from '../../tenants/tenants.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { LoggerService } from '../../../common/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const suppliedTenant = loginDto.tenant_id;

    this.logger.log(`Login attempt for tenant ${suppliedTenant}`);

    if (!suppliedTenant) {
      this.logger.warn('Login attempt without tenant');
      throw new UnauthorizedException(
        'Tenant não identificado. Informe tenant_id.',
      );
    }

    let tenantId = suppliedTenant;
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!uuidRegex.test(tenantId)) {
      try {
        const tenant = await this.tenantsService.findByNameOrEmail(tenantId);
        tenantId = tenant.id;
      } catch (error) {
        this.logger.warn(
          `Tenant not found using identifier \"${tenantId}\" `,
          error,
        );
        throw new UnauthorizedException('Tenant inválido');
      }
    }

    const { email, password } = loginDto;

    try {
      const user = await this.usersService.findByEmail(tenantId, email);

      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
        this.logger.warn(
          `Login failed for email \"${email}\" in tenant \"${tenantId}\" - Invalid password`,
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        tenant_id: user.tenant_id,
      };

      this.logger.log(
        `Login successful for user ${user.id} in tenant ${tenantId}`,
      );

      try {
        return {
          access_token: this.jwtService.sign(payload),
        };
      } catch (error) {
        this.logger.error('JWT signing failed:', error);
        throw new InternalServerErrorException('Internal authentication error');
      }
    } catch (error) {
      this.logger.error('Login error:', error);

      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      throw new InternalServerErrorException('Internal authentication error');
    }
  }
}
