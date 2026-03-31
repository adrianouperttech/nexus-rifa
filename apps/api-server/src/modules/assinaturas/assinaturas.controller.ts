import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Inject,
} from '@nestjs/common';
import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { BillingGuard } from '../../billing/guards/billing.guard';
import { Logger } from 'winston';

@Controller('tenants/:tenant_id/assinaturas')
export class AssinaturasController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly assinaturasService: AssinaturasService,
  ) {}

  @Post()
  @UseGuards(BillingGuard)
  create(
    @Param('tenant_id') tenant_id: string,
    @Body() createAssinaturaDto: CreateAssinaturaDto,
  ) {
    return this.assinaturasService.create(tenant_id, createAssinaturaDto);
  }

  @Post('webhook')
  webhook(@Body() data: any) {
    this.logger.info('Webhook de assinatura recebido:', { data });
    return this.assinaturasService.handleWebhook(data);
  }
}
