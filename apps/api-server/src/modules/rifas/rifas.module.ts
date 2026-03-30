import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';
import { Rifa } from './entities/rifa.entity';
import { CotasModule } from '../cotas/cotas.module';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa]), CotasModule, PlansModule],
  controllers: [RifasController],
  providers: [RifasService],
  exports: [RifasService],
})
export class RifasModule {}
