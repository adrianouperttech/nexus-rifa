import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('subscribe')
  @UseGuards(AuthGuard('jwt'))
  async subscribe(@Req() req, @Body('plan_id') plan_id: string) {
    const tenant_id = req.user.tenant_id;
    const user_id = req.user.id;
    return this.billingService.createSubscription(tenant_id, plan_id, user_id);
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(@Body() notification: any) {
    this.billingService.handleWebhook(notification);
  }
}
