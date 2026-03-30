import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AutomationsService } from './automations.service';
import { ReservasModule } from '../modules/reservas/reservas.module';
import { BillingModule } from '../modules/billing/billing.module';
import { TenantsModule } from '../modules/tenants/tenants.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ReservasModule,
    BillingModule,
    TenantsModule,
  ],
  providers: [AutomationsService],
})
export class AutomationsModule {}
