import { Module, forwardRef } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { TenantsModule } from '../tenants/tenants.module';
import { RifasModule } from '../rifas/rifas.module';
import { IntegrationsModule } from '../../integrations/integrations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    forwardRef(() => TenantsModule),
    forwardRef(() => RifasModule),
    IntegrationsModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
