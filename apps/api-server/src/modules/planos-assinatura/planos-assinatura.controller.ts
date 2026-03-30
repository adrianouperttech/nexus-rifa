import { Controller, Post, Body } from '@nestjs/common';
import { PlanosAssinaturaService } from './planos-assinatura.service';
import { CreatePlanoAssinaturaDto } from './dto/create-plano-assinatura.dto';

@Controller('planos-assinatura')
export class PlanosAssinaturaController {
  constructor(
    private readonly planosAssinaturaService: PlanosAssinaturaService,
  ) {}

  @Post()
  create(@Body() createPlanoAssinaturaDto: CreatePlanoAssinaturaDto) {
    return this.planosAssinaturaService.create(createPlanoAssinaturaDto);
  }
}
