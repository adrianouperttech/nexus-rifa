import { Module, forwardRef } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { PlansModule } from '../plans/plans.module';
import MercadoPago from 'mercadopago';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TenantsModule } from '../tenants/tenants.module';
import { WebhookValidationService } from '../../common/security/webhook-validation.service'; // Importa o serviço

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Subscription]),
    forwardRef(() => PlansModule), // Correção: Usar forwardRef
    UsersModule,
    TenantsModule,
  ],
  controllers: [BillingController],
  providers: [
    BillingService,
    WebhookValidationService, // Adiciona o serviço como provider
    {
      provide: 'MERCADOPAGO',
      useFactory: () => {
        return new MercadoPago({
          accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
        });
      },
    },
  ],
})
export class BillingModule {}
