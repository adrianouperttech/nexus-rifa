"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssinaturasController = void 0;
const common_1 = require("@nestjs/common");
const assinaturas_service_1 = require("./assinaturas.service");
const create_assinatura_dto_1 = require("./dto/create-assinatura.dto");
const billing_guard_1 = require("../../billing/guards/billing.guard");
let AssinaturasController = class AssinaturasController {
    assinaturasService;
    constructor(assinaturasService) {
        this.assinaturasService = assinaturasService;
    }
    create(tenant_id, createAssinaturaDto) {
        return this.assinaturasService.create(tenant_id, createAssinaturaDto);
    }
    webhook(data) {
        return this.assinaturasService.handleWebhook(data);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(billing_guard_1.BillingGuard),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_assinatura_dto_1.CreateAssinaturaDto]),
    __metadata("design:returntype", void 0)
], AssinaturasController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssinaturasController.prototype, "webhook", null);
AssinaturasController = __decorate([
    (0, common_1.Controller)('tenants/:tenant_id/assinaturas'),
    __metadata("design:paramtypes", [assinaturas_service_1.AssinaturasService])
], AssinaturasController);
exports.AssinaturasController = AssinaturasController;
//# sourceMappingURL=assinaturas.controller.js.map