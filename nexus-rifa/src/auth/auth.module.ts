import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Assuming you have a UserModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { LocalStrategy } from './local.strategy'; // Import LocalStrategy

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy], // Add LocalStrategy
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
