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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const rifas_module_1 = require("./modules/rifas/rifas.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const cota_entity_1 = require("./modules/cotas/entities/cota.entity");
const rifa_entity_1 = require("./modules/rifas/entities/rifa.entity");
const user_entity_1 = require("./modules/users/entities/user.entity");
const root_user_entity_1 = require("./modules/root-users/entities/root-user.entity");
const premio_entity_1 = require("./modules/premios/entities/premio.entity");
const reserva_entity_1 = require("./modules/reservas/entities/reserva.entity");
const pagamento_entity_1 = require("./modules/pagamentos/entities/pagamento.entity");
const tenant_entity_1 = require("./modules/tenants/entities/tenant.entity");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const subscription_entity_1 = require("./modules/billing/entities/subscription.entity");
const billing_module_1 = require("./modules/billing/billing.module");
const logger_module_1 = require("./common/logger/logger.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 60,
                    },
                ],
            }),
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
                        entities: [
                            cota_entity_1.Cota,
                            rifa_entity_1.Rifa,
                            user_entity_1.User,
                            root_user_entity_1.RootUser,
                            premio_entity_1.Premio,
                            reserva_entity_1.Reserva,
                            pagamento_entity_1.Pagamento,
                            tenant_entity_1.Tenant,
                            subscription_entity_1.Subscription,
                        ],
                        synchronize: false,
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
            billing_module_1.BillingModule,
            logger_module_1.LoggerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map