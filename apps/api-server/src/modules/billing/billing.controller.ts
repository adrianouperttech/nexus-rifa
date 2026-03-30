import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { AuthGuard } from '@nestjs/passport';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly webhookValidationService: WebhookValidationService,
  ) {}

  @Post('subscribe')
  @UseGuards(AuthGuard('jwt'))
  async subscribe(@Req() req, @Body('plan_id') plan_id: string) {
    const tenant_id = req.user.tenant_id;
    const user_id = req.user.id;
    return this.billingService.createSubscription(tenant_id, plan_id, user_id);
  }

  @SkipThrottle()
  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Headers('x-signature') signature: string,
    @Body() notification: any,
  ) {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) {
      console.error('MERCADOPAGO_WEBHOOK_SECRET não está configurado.');
      return;
    }

    const isValid = this.webhookValidationService.validate(
      signature,
      notification,
      secret,
    );

    if (!isValid) {
      console.warn('Assinatura de webhook de billing inválida.');
      return; // Responde 200 OK, mas não processa.
    }

    console.log('Webhook de Billing recebido e validado:', notification);
    try {
      await this.billingService.handleWebhook(notification);
    } catch (error) {
      console.error('Erro ao processar webhook de billing validado:', error);
    }
  }
}
