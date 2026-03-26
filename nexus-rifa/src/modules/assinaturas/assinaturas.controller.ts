import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { BillingGuard } from '../../common/guards/billing.guard';

@Controller('tenants/:tenant_id/assinaturas')
export class AssinaturasController {
  constructor(private readonly assinaturasService: AssinaturasService) {}

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
    return this.assinaturasService.handleWebhook(data);
  }
}
