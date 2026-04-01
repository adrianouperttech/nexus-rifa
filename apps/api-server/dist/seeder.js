"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const app_module_1 = require("./app.module");
const root_user_entity_1 = require("./modules/root-users/entities/root-user.entity");
const tenant_entity_1 = require("./modules/tenants/entities/tenant.entity");
const user_entity_1 = require("./modules/users/entities/user.entity");
const rifa_entity_1 = require("./modules/rifas/entities/rifa.entity");
const cota_entity_1 = require("./modules/cotas/entities/cota.entity");
const root_user_seeder_1 = require("./database/seeders/root-user.seeder");
const test_data_seeder_1 = require("./database/seeders/test-data.seeder");
(0, nestjs_seeder_1.seeder)({
    imports: [
        app_module_1.AppModule,
        typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUser, tenant_entity_1.Tenant, user_entity_1.User, rifa_entity_1.Rifa, cota_entity_1.Cota]),
    ],
}).run([root_user_seeder_1.RootUserSeeder, test_data_seeder_1.TestDataSeeder]);
//# sourceMappingURL=seeder.js.map