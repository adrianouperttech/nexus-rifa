import { Module } from '@nestjs/common';
import { PlanosAssinaturaController } from './planos-assinatura.controller';
import { PlanosAssinaturaService } from './planos-assinatura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoAssinatura } from './entities/plano-assinatura.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PlanoAssinatura]), HttpModule],
  controllers: [PlanosAssinaturaController],
  providers: [PlanosAssinaturaService],
})
export class PlanosAssinaturaModule {}
