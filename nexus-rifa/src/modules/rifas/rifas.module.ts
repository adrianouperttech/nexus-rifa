import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rifa } from './entities/rifa.entity';
import { RifasService } from './rifas.service';
import { RifasController } from './rifas.controller';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa]), forwardRef(() => BillingModule)],
  controllers: [RifasController],
  providers: [RifasService],
  exports: [RifasService],
})
export class RifasModule {}
