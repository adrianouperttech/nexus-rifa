import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';
import { Rifa } from './entities/rifa.entity';
import { CotasModule } from '../cotas/cotas.module';
import { BillingModule } from '../billing/billing.module';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa]), CotasModule, BillingModule, PlansModule],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
