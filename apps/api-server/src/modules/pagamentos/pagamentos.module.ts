import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';
import { ReservasModule } from '../reservas/reservas.module';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    forwardRef(() => ReservasModule),
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService, WebhookValidationService],
  exports: [PagamentosService],
})
export class PagamentosModule {}
