import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Headers,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly logger: LoggerService,
    private readonly billingService: BillingService,
    private readonly webhookValidationService: WebhookValidationService,
  ) {}

  @Post('subscription')
  @UseGuards(AuthGuard('jwt'))
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.billingService.createSubscription(createSubscriptionDto);
  }

  @Post('webhook')
  async webhook(@Headers('x-signature') signature: string, @Body() body: any) {
    const secret = process.env.MP_WEBHOOK_SECRET;

    if (!secret) {
      this.logger.error(
        'MP_WEBHOOK_SECRET não está configurado. Webhook não pode ser validado.',
      );
      throw new BadRequestException('Webhook secret não configurado');
    }

    if (!signature) {
      this.logger.warn(
        'Assinatura de webhook ausente ao chamar /billing/webhook',
      );
      throw new UnauthorizedException('Assinatura de webhook ausente');
    }

    const valid = this.webhookValidationService.validate(
      signature,
      body,
      secret,
    );
    if (!valid) {
      this.logger.warn('Assinatura de webhook inválida');
      throw new UnauthorizedException('Assinatura de webhook inválida');
    }

    this.logger.log(
      `Webhook de billing recebido e validado: ${JSON.stringify(body)}`,
    );
    return this.billingService.webhook(body);
  }

  @Get('subscription/:id')
  @UseGuards(AuthGuard('jwt'))
  getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscription(id);
  }
}
