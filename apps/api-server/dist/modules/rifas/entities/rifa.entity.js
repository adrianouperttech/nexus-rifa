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
exports.Rifa = void 0;
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("../../tenants/entities/tenant.entity");
const reserva_entity_1 = require("../../reservas/entities/reserva.entity");
const premio_entity_1 = require("../../premios/entities/premio.entity");
let Rifa = class Rifa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rifa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rifa.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Rifa.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rifa.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], Rifa.prototype, "valor_cota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 1 }),
    __metadata("design:type", Number)
], Rifa.prototype, "min_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Rifa.prototype, "max_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rifa.prototype, "chave_pix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'ativa' }),
    __metadata("design:type", String)
], Rifa.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Rifa.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Rifa.prototype, "limite", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Rifa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.rifas),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Rifa.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Cota', (cota) => cota.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "cotas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => premio_entity_1.Premio, (premio) => premio.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "premios", void 0);
Rifa = __decorate([
    (0, typeorm_1.Entity)('rifas')
], Rifa);
exports.Rifa = Rifa;
//# sourceMappingURL=rifa.entity.js.map