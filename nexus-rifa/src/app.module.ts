import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { RifasModule } from './modules/rifas/rifas.module';
import { CotasModule } from './modules/cotas/cotas.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { PagamentosModule } from './modules/pagamentos/pagamentos.module';
import { BillingModule } from './modules/billing/billing.module';
import { PlansModule } from './modules/plans/plans.module';
import { DatabaseModule } from './database/database.module';
import { AutomationsModule } from './automations/automations.module';
import { AdminModule } from './modules/admin/admin.module';
import { AssinaturasModule } from './modules/assinaturas/assinaturas.module';
import { PlanosAssinaturaModule } from './modules/planos-assinatura/planos-assinatura.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TenantsModule,
    RifasModule,
    CotasModule,
    ReservasModule,
    PagamentosModule,
    BillingModule,
    PlansModule,
    AutomationsModule,
    AdminModule,
    AssinaturasModule,
    PlanosAssinaturaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
