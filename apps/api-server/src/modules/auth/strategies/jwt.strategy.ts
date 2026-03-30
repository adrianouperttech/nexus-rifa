
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
    });
  }

  async validate(payload: any) {
    // O payload do JWT decodificado contém o ID do usuário (sub) e o tenant_id
    if (!payload.sub || !payload.tenant_id) {
      throw new UnauthorizedException('Token inválido ou malformado');
    }

    // Busca o usuário no banco de dados usando o tenant_id e o user_id do TOKEN.
    // Isso garante que o usuário pertence ao tenant especificado no token.
    const user = await this.usersService.findOne(payload.tenant_id, payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou token inválido');
    }

    // O objeto 'user' retornado aqui (incluindo tenant_id e roles)
    // será injetado no objeto `req.user` de todas as rotas protegidas.
    return user;
  }
}
