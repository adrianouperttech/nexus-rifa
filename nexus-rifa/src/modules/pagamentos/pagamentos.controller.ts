import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  create(
    @Headers('tenant-id') tenant_id: string, // Supondo que você use um header para o tenant
    @Body() createPagamentoDto: CreatePagamentoDto,
  ) {
    return this.pagamentosService.create(tenant_id, createPagamentoDto);
  }

  // Rota para receber os webhooks do Mercado Pago
  @Post('webhook')
  @HttpCode(HttpStatus.OK) // Sempre retorne 200 OK para o Mercado Pago
  async handleWebhook(@Body() notification: any) {
    console.log('Webhook do Mercado Pago recebido:', notification);
    try {
      await this.pagamentosService.handlePagamentoWebhook(notification);
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      // Mesmo com erro, retornamos 200 para evitar que o MP sobrecarregue com retentativas.
      // A lógica de erro já foi logada para análise.
    }
    // O retorno é implícito, respondendo com 200 OK e sem corpo.
  }
}
