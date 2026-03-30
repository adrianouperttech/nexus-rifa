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
var AutomationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const reservas_service_1 = require("../modules/reservas/reservas.service");
const tenants_service_1 = require("../modules/tenants/tenants.service");
const billing_service_1 = require("../modules/billing/billing.service");
let AutomationsService = AutomationsService_1 = class AutomationsService {
    constructor(reservasService, tenantsService, billingService) {
        this.reservasService = reservasService;
        this.tenantsService = tenantsService;
        this.billingService = billingService;
        this.logger = new common_1.Logger(AutomationsService_1.name);
    }
    async handleExpireReservas() {
        this.logger.log('Verificando reservas expiradas...');
        const tenants = await this.tenantsService.findAll();
        for (const tenant of tenants) {
            const pendingReservas = await this.reservasService.findByStatus(tenant.id, 'disponivel');
            const now = new Date();
            for (const reserva of pendingReservas) {
                const createdAt = new Date(reserva.created_at);
                const expirationTime = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
                if (now > expirationTime) {
                    this.logger.log(`Reserva ${reserva.id} expirada. Atualizando status...`);
                    await this.reservasService.updateStatus(reserva.tenant_id, reserva.id, 'expirada');
                }
            }
        }
    }
    async handleSaaSCobrança() {
        this.logger.log('Executando cobrança SaaS...');
    }
};
exports.AutomationsService = AutomationsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationsService.prototype, "handleExpireReservas", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomationsService.prototype, "handleSaaSCobran\u00E7a", null);
exports.AutomationsService = AutomationsService = AutomationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservas_service_1.ReservasService,
        tenants_service_1.TenantsService,
        billing_service_1.BillingService])
], AutomationsService);
//# sourceMappingURL=automations.service.js.map