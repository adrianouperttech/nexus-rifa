"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const rifas_module_1 = require("./modules/rifas/rifas.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const cota_entity_1 = require("./modules/cotas/entities/cota.entity");
const rifa_entity_1 = require("./modules/rifas/entities/rifa.entity");
const user_entity_1 = require("./modules/users/entities/user.entity");
const premio_entity_1 = require("./modules/premios/entities/premio.entity");
const reserva_entity_1 = require("./modules/reservas/entities/reserva.entity");
const pagamento_entity_1 = require("./modules/pagamentos/entities/pagamento.entity");
const tenant_entity_1 = require("./modules/tenants/entities/tenant.entity");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const subscription_entity_1 = require("./modules/subscriptions/entities/subscription.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 60,
                }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const databaseUrl = configService.get('DATABASE_URL');
                    if (!databaseUrl) {
                        throw new Error('A variável de ambiente DATABASE_URL não está definida.');
                    }
                    return {
                        type: 'postgres',
                        url: databaseUrl,
                        entities: [cota_entity_1.Cota, rifa_entity_1.Rifa, user_entity_1.User, premio_entity_1.Premio, reserva_entity_1.Reserva, pagamento_entity_1.Pagamento, tenant_entity_1.Tenant, subscription_entity_1.Subscription],
                        synchronize: true,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    };
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rifas_module_1.RifasModule,
            tenants_module_1.TenantsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map