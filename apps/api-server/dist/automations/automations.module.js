"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const automations_service_1 = require("./automations.service");
const reservas_module_1 = require("../modules/reservas/reservas.module");
const tenants_module_1 = require("../modules/tenants/tenants.module");
let AutomationsModule = class AutomationsModule {
};
AutomationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            reservas_module_1.ReservasModule,
            tenants_module_1.TenantsModule,
        ],
        providers: [automations_service_1.AutomationsService],
    })
], AutomationsModule);
exports.AutomationsModule = AutomationsModule;
//# sourceMappingURL=automations.module.js.map