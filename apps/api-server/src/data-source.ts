import { DataSource } from 'typeorm';
import { Cota } from './modules/cotas/entities/cota.entity';
import { Rifa } from './modules/rifas/entities/rifa.entity';
import { User } from './modules/users/entities/user.entity';
import { Premio } from './modules/premios/entities/premio.entity';
import { Reserva } from './modules/reservas/entities/reserva.entity';
import { Pagamento } from './modules/pagamentos/entities/pagamento.entity';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { Subscription } from './modules/billing/entities/subscription.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    Cota,
    Rifa,
    User,
    Premio,
    Reserva,
    Pagamento,
    Tenant,
    Subscription,
  ],
  migrations: ['apps/api-server/src/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
