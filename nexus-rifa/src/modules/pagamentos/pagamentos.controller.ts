import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { AuthGuard } from '@nestjs/passport';
import { TenantInfo, GetTenantInfo } from '../tenants/decorators/tenant-info.decorator';

interface WebhookPayload {
  transacao_id: string;
  status: 'pago' | 'cancelado';
}

@Controller('pagamentos')
export class PagamentosController {
  constructor(
    private readonly pagamentosService: PagamentosService,
    private readonly webhookValidationService: WebhookValidationService,
  ) {}

  @Post()
  create(
    @GetTenantInfo() tenantInfo: TenantInfo,
    @Body() createPagamentoDto: CreatePagamentoDto,
  ) {
    return this.pagamentosService.create(tenantInfo.id, createPagamentoDto);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('webhook'))
  async handleWebhook(@Req() req: Request, @Body() payload: WebhookPayload) {
    const signature = req.headers.get('x-hub-signature');
    if (!process.env.WEBHOOK_SECRET) {
      throw new Error('WEBHOOK_SECRET not set');
    }
    const isValid = this.webhookValidationService.validate(
      JSON.stringify(payload),
      signature,
      process.env.WEBHOOK_SECRET,
    );
    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }
    const { transacao_id, status } = payload;
    await this.pagamentosService.handlePagamentoWebhook(transacao_id, status);
  }
}
