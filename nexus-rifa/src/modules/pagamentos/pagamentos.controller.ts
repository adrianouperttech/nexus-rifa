import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { AuthGuard } from '@nestjs/passport';

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
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('webhook'))
  async handleWebhook(@Req() req: Request, @Body() payload: WebhookPayload) {
    const signature = req.headers['x-hub-signature'];
    const isValid = this.webhookValidationService.validate(req.body, signature);
    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }
    const { transacao_id, status } = payload;
    await this.pagamentosService.handlePagamentoWebhook(transacao_id, status);
  }
}
