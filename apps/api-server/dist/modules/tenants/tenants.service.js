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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("./entities/tenant.entity");
const logger_service_1 = require("../../common/logger/logger.service");
let TenantsService = class TenantsService {
    constructor(logger, tenantRepository) {
        this.logger = logger;
        this.tenantRepository = tenantRepository;
    }
    async create(createTenantDto) {
        this.logger.log('Creating a new tenant');
        const tenant = this.tenantRepository.create(createTenantDto);
        return this.tenantRepository.save(tenant);
    }
    async findAll() {
        this.logger.log('Finding all tenants');
        return this.tenantRepository.find();
    }
    async findOne(id) {
        this.logger.log(`Finding tenant with id ${id}`);
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            this.logger.warn(`Tenant with ID "${id}" not found`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
        return tenant;
    }
    async findByEmail(email) {
        this.logger.log(`Finding tenant with email ${email}`);
        const tenant = await this.tenantRepository.findOne({ where: { email } });
        if (!tenant) {
            this.logger.warn(`Tenant with email "${email}" not found`);
            throw new common_1.NotFoundException(`Tenant with email \"${email}\" not found`);
        }
        return tenant;
    }
    async findByName(nome) {
        this.logger.log(`Finding tenant with nome ${nome}`);
        const tenant = await this.tenantRepository.findOne({ where: { nome } });
        if (!tenant) {
            this.logger.warn(`Tenant with nome "${nome}" not found`);
            throw new common_1.NotFoundException(`Tenant with nome "${nome}" not found`);
        }
        return tenant;
    }
    async update(id, updateTenantDto) {
        this.logger.log(`Updating tenant with id ${id}`);
        const tenant = await this.tenantRepository.preload(Object.assign({ id: id }, updateTenantDto));
        if (!tenant) {
            this.logger.warn(`Tenant with ID "${id}" not found for update`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
        return this.tenantRepository.save(tenant);
    }
    async remove(id) {
        this.logger.log(`Removing tenant with id ${id}`);
        const result = await this.tenantRepository.delete(id);
        if (result.affected === 0) {
            this.logger.warn(`Tenant with ID "${id}" not found for removal`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.Repository])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map