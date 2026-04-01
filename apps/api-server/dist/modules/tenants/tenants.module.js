"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsModule = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("./tenants.service");
const tenants_controller_1 = require("./tenants.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_entity_1 = require("./entities/tenant.entity");
const users_module_1 = require("../users/users.module");
const platform_express_1 = require("@nestjs/platform-express");
const reservas_module_1 = require("../reservas/reservas.module");
const subscriptions_module_1 = require("../subscriptions/subscriptions.module");
let TenantsModule = class TenantsModule {
};
TenantsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant]), users_module_1.UsersModule, platform_express_1.MulterModule, (0, common_1.forwardRef)(() => reservas_module_1.ReservasModule), subscriptions_module_1.SubscriptionsModule],
        controllers: [tenants_controller_1.TenantsController],
        providers: [tenants_service_1.TenantsService],
        exports: [tenants_service_1.TenantsService],
    })
], TenantsModule);
exports.TenantsModule = TenantsModule;
//# sourceMappingURL=tenants.module.js.map