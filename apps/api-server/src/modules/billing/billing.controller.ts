import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly logger: LoggerService,
    private readonly billingService: BillingService,
  ) {}

  @Post('subscription')
  @UseGuards(AuthGuard('jwt'))
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.billingService.createSubscription(createSubscriptionDto);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    this.logger.log(`Webhook de billing recebido: ${JSON.stringify(body)}`);
    return this.billingService.webhook(body);
  }

  @Get('subscription/:id')
  @UseGuards(AuthGuard('jwt'))
  getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscription(id);
  }
}
