"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RifasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rifa_entity_1 = require("./entities/rifa.entity");
const rifas_service_1 = require("./rifas.service");
const rifas_controller_1 = require("./rifas.controller");
const billing_module_1 = require("../billing/billing.module");
let RifasModule = class RifasModule {
};
RifasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rifa_entity_1.Rifa]), (0, common_1.forwardRef)(() => billing_module_1.BillingModule)],
        controllers: [rifas_controller_1.RifasController],
        providers: [rifas_service_1.RifasService],
        exports: [rifas_service_1.RifasService],
    })
], RifasModule);
exports.RifasModule = RifasModule;
//# sourceMappingURL=rifas.module.js.map