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
exports.Tenant = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const rifa_entity_1 = require("../../rifas/entities/rifa.entity");
const cota_entity_1 = require("../../cotas/entities/cota.entity");
const reserva_entity_1 = require("../../reservas/entities/reserva.entity");
const subscription_entity_1 = require("../../billing/entities/subscription.entity");
let Tenant = class Tenant {
    id;
    nome;
    email;
    ativo;
    created_at;
    users;
    rifas;
    cotas;
    reservas;
    subscriptions;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Tenant.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rifa_entity_1.Rifa, (rifa) => rifa.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "rifas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cota_entity_1.Cota, (cota) => cota.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "cotas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (subscription) => subscription.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "subscriptions", void 0);
Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants')
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.entity.js.map