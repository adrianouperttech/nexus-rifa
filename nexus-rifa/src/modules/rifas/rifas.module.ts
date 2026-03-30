import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasService } from './rifas.service';
import { RifasController } from './rifas.controller';
import { Rifa } from './entities/rifa.entity';
import { BillingModule } from '../billing/billing.module'; // Correção: Importar BillingModule
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rifa]),
    BillingModule, // Correção: Usar BillingModule
    PlansModule,
  ],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
