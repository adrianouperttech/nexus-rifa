import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true, // Habilita a passagem da requisição para o validate
    });
  }

  async validate(req: any, payload: any) {
    const tenant_id = req.params.tenant_id;
    if (payload.tenant_id !== tenant_id) {
      throw new UnauthorizedException('Invalid tenant');
    }

    const user = await this.usersService.findOne(tenant_id, payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
