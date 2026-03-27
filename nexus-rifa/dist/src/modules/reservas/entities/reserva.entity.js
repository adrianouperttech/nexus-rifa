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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("../../tenants/entities/tenant.entity");
const rifa_entity_1 = require("../../rifas/entities/rifa.entity");
let Reserva = class Reserva {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reserva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reserva.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reserva.prototype, "rifa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Reserva.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'reservada' }),
    __metadata("design:type", String)
], Reserva.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reserva.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Reserva.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rifa_entity_1.Rifa, (rifa) => rifa.reservas),
    (0, typeorm_1.JoinColumn)({ name: 'rifa_id' }),
    __metadata("design:type", rifa_entity_1.Rifa)
], Reserva.prototype, "rifa", void 0);
Reserva = __decorate([
    (0, typeorm_1.Entity)('reservas')
], Reserva);
exports.Reserva = Reserva;
//# sourceMappingURL=reserva.entity.js.map