import { Module, forwardRef } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), forwardRef(() => TenantsModule)],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService] // Adicionado para que outros módulos possam usar
})
export class ReservasModule {}
