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
const plans_service_1 = require("../plans/plans.service");
const logger_service_1 = require("../../common/logger/logger.service");
let RifasService = class RifasService {
    constructor(logger, rifasRepository, plansService) {
        this.logger = logger;
        this.rifasRepository = rifasRepository;
        this.plansService = plansService;
    }
    async create(tenant_id, createRifaDto) {
        this.logger.log(`Creating Rifa for tenant ${tenant_id}`);
        const rifa = this.rifasRepository.create(Object.assign(Object.assign({}, createRifaDto), { tenant_id }));
        return this.rifasRepository.save(rifa);
    }
    async findAll(tenant_id) {
        this.logger.log(`Finding all Rifas for tenant ${tenant_id}`);
        return this.rifasRepository.find({ where: { tenant_id } });
    }
    async findOne(tenant_id, id) {
        this.logger.log(`Finding Rifa with id ${id} for tenant ${tenant_id}`);
        const rifa = await this.rifasRepository.findOne({
            where: { id, tenant_id },
        });
        if (!rifa) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}"`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
        return rifa;
    }
    async update(tenant_id, id, updateRifaDto) {
        this.logger.log(`Updating Rifa with id ${id} for tenant ${tenant_id}`);
        const rifa = await this.rifasRepository.preload(Object.assign({ id: id, tenant_id: tenant_id }, updateRifaDto));
        if (!rifa) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to update`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
        return this.rifasRepository.save(rifa);
    }
    async remove(tenant_id, id) {
        this.logger.log(`Removing Rifa with id ${id} for tenant ${tenant_id}`);
        const result = await this.rifasRepository.delete({ id, tenant_id });
        if (result.affected === 0) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to remove`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
    }
};
exports.RifasService = RifasService;
exports.RifasService = RifasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(rifa_entity_1.Rifa)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.Repository,
        plans_service_1.PlansService])
], RifasService);
//# sourceMappingURL=rifas.service.js.map