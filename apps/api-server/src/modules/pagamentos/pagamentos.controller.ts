import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  UseGuards,
  Req,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { AuthGuard } from '@nestjs/passport';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { SkipThrottle } from '@nestjs/throttler';
import { Logger } from 'winston';

@Controller('pagamentos')
export class PagamentosController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly pagamentosService: PagamentosService,
    private readonly webhookValidationService: WebhookValidationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req, @Body() createPagamentoDto: CreatePagamentoDto) {
    const tenant_id = req.user.tenant_id;
    return this.pagamentosService.create(tenant_id, createPagamentoDto);
  }

  @SkipThrottle()
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('x-signature') signature: string,
    @Body() notification: any,
  ) {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) {
      this.logger.error('MERCADOPAGO_WEBHOOK_SECRET não está configurado.');
      // Não lance um erro que o Mercado Pago possa ver, apenas logue.
      return;
    }

    const isValid = this.webhookValidationService.validate(
      signature,
      notification,
      secret,
    );

    if (!isValid) {
      this.logger.warn('Assinatura de webhook do Mercado Pago inválida.');
      // Responda 200 OK para não ser inundado com retentativas, mas não processe.
      return;
    }

    this.logger.info('Webhook do Mercado Pago recebido e validado:', { notification });
    try {
      await this.pagamentosService.handlePagamentoWebhook(notification);
    } catch (error) {
      this.logger.error('Erro ao processar webhook validado:', { error });
    }
  }
}
