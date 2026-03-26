import { Module } from '@nestjs/common';
import { AssinaturasController } from './assinaturas.controller';
import { AssinaturasService } from './assinaturas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from './entities/assinatura.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Assinatura]), HttpModule],
  controllers: [AssinaturasController],
  providers: [AssinaturasService],
})
export class AssinaturasModule {}
