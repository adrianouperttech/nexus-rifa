import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly logger: LoggerService,
    private readonly billingService: BillingService,
  ) {}

  @Post('subscription')
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.billingService.createSubscription(createSubscriptionDto);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    this.logger.log(`Webhook de billing recebido: ${JSON.stringify(body)}`);
    return this.billingService.webhook(body);
  }

  @Get('subscription/:id')
  getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscription(id);
  }
}
