import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { RifasModule } from '../rifas/rifas.module';
import { IntegrationsModule } from '../../integrations/integrations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    forwardRef(() => RifasModule),
    IntegrationsModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
