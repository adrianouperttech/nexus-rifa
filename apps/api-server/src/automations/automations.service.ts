import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReservasService } from '../modules/reservas/reservas.service';
import { TenantsService } from '../modules/tenants/tenants.service';

@Injectable()
export class AutomationsService {
  private readonly logger = new Logger(AutomationsService.name);

  constructor(
    private readonly reservasService: ReservasService,
    private readonly tenantsService: TenantsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleExpireReservas() {
    this.logger.log('Verificando reservas expiradas...');
    const tenants = await this.tenantsService.findAll();
    for (const tenant of tenants) {
      const pendingReservas = await this.reservasService.findByStatus(
        tenant.id,
        'disponivel',
      );
      const now = new Date();

      for (const reserva of pendingReservas) {
        const createdAt = new Date(reserva.created_at);
        const expirationTime = new Date(
          createdAt.getTime() + 24 * 60 * 60 * 1000,
        ); // 24 hours

        if (now > expirationTime) {
          this.logger.log(
            `Reserva ${reserva.id} expirada. Atualizando status...`,
          );
          await this.reservasService.updateStatus(
            reserva.tenant_id,
            reserva.id,
            'expirada',
          );
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSaaSCobrança() {
    this.logger.log('Executando cobrança SaaS...');
  }
}
