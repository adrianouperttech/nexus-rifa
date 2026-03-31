import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Logger } from 'winston';

@Controller('billing')
export class BillingController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly billingService: BillingService,
  ) {}

  @Post('subscription')
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.billingService.createSubscription(createSubscriptionDto);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    this.logger.info('Webhook de billing recebido:', { body });
    return this.billingService.webhook(body);
  }

  @Get('subscription/:id')
  getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscription(id);
  }
}
