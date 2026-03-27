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
exports.RifasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rifa_entity_1 = require("./entities/rifa.entity");
const assinaturas_service_1 = require("../assinaturas/assinaturas.service");
const plans_service_1 = require("../plans/plans.service");
let RifasService = class RifasService {
    rifasRepository;
    assinaturasService;
    plansService;
    constructor(rifasRepository, assinaturasService, plansService) {
        this.rifasRepository = rifasRepository;
        this.assinaturasService = assinaturasService;
        this.plansService = plansService;
    }
    async create(tenant_id, createRifaDto) {
        const subscription = await this.assinaturasService.findByTenantId(tenant_id);
        if (!subscription || subscription.status !== 'authorized') {
            throw new common_1.ForbiddenException('No active subscription found.');
        }
        const plan = await this.plansService.findOne(subscription.plan_id);
        if (!plan) {
            throw new common_1.NotFoundException(`Plan with ID "${subscription.plan_id}" not found`);
        }
        const count = await this.rifasRepository.count({ where: { tenant_id } });
        if (count >= plan.limit) {
            throw new common_1.ForbiddenException('Raffle limit reached.');
        }
        const rifa = this.rifasRepository.create({ ...createRifaDto, tenant_id });
        return this.rifasRepository.save(rifa);
    }
    async findAll(tenant_id) {
        return this.rifasRepository.find({ where: { tenant_id } });
    }
    async findOne(tenant_id, id) {
        const rifa = await this.rifasRepository.findOne({
            where: { id, tenant_id },
        });
        if (!rifa) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
        return rifa;
    }
    async update(tenant_id, id, updateRifaDto) {
        const rifa = await this.rifasRepository.preload({
            id: id,
            tenant_id: tenant_id,
            ...updateRifaDto,
        });
        if (!rifa) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
        return this.rifasRepository.save(rifa);
    }
    async remove(tenant_id, id) {
        const result = await this.rifasRepository.delete({ id, tenant_id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
    }
};
RifasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rifa_entity_1.Rifa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        assinaturas_service_1.AssinaturasService,
        plans_service_1.PlansService])
], RifasService);
exports.RifasService = RifasService;
//# sourceMappingURL=rifas.service.js.map