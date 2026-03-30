import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';
import { Rifa } from './entities/rifa.entity';
import { CotasModule } from '../cotas/cotas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa]), CotasModule],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
