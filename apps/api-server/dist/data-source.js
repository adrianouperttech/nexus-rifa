"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const cota_entity_1 = require("./modules/cotas/entities/cota.entity");
const rifa_entity_1 = require("./modules/rifas/entities/rifa.entity");
const user_entity_1 = require("./modules/users/entities/user.entity");
const premio_entity_1 = require("./modules/premios/entities/premio.entity");
const reserva_entity_1 = require("./modules/reservas/entities/reserva.entity");
const pagamento_entity_1 = require("./modules/pagamentos/entities/pagamento.entity");
const tenant_entity_1 = require("./modules/tenants/entities/tenant.entity");
const subscription_entity_1 = require("./modules/billing/entities/subscription.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [cota_entity_1.Cota, rifa_entity_1.Rifa, user_entity_1.User, premio_entity_1.Premio, reserva_entity_1.Reserva, pagamento_entity_1.Pagamento, tenant_entity_1.Tenant, subscription_entity_1.Subscription],
    migrations: ['apps/api-server/src/migrations/*.ts'],
    ssl: {
        rejectUnauthorized: false,
    },
});
//# sourceMappingURL=data-source.js.map