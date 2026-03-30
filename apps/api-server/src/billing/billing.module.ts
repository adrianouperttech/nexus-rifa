import { Module } from '@nestjs/common';
import { BillingGuard } from './guards/billing.guard';

@Module({
  providers: [BillingGuard],
  exports: [BillingGuard],
})
export class BillingModule {}
