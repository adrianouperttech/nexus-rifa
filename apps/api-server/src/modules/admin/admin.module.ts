import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RootUsersModule } from '../root-users/root-users.module';
import { AdminAuthController } from './auth/controllers/admin-auth.controller';
import { AdminAuthService } from './auth/services/admin-auth.service';
import { AdminPlansController } from './plans/controllers/admin-plans.controller';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [
    RootUsersModule,
    PlansModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminAuthController, AdminPlansController],
  providers: [AdminAuthService],
})
export class AdminModule {}
