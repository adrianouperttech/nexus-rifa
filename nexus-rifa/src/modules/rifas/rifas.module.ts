import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasService } from './rifas.service';
import { RifasController } from './rifas.controller';
import { Rifa } from './entities/rifa.entity';
import { AssinaturasModule } from '../assinaturas/assinaturas.module';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa]), AssinaturasModule, PlansModule],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
