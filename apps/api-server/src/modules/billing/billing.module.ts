import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { Subscription } from './entities/subscription.entity';
import { LoggerModule } from '../../common/logger/logger.module';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), LoggerModule],
  controllers: [BillingController],
  providers: [BillingService, WebhookValidationService],
  exports: [BillingService],
})
export class BillingModule {}
