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
const rifa_entity_1 = require("./rifa.entity");
let RifasService = class RifasService {
    constructor(rifasRepository) {
        this.rifasRepository = rifasRepository;
    }
    findAll() {
        return this.rifasRepository.find();
    }
    async findOne(id) {
        const rifa = await this.rifasRepository.findOne({ where: { id } });
        if (!rifa) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
        return rifa;
    }
    create(rifa) {
        return this.rifasRepository.save(rifa);
    }
    async update(id, rifa) {
        await this.rifasRepository.update(id, rifa);
        const updatedRifa = await this.rifasRepository.findOne({ where: { id } });
        if (!updatedRifa) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
        return updatedRifa;
    }
    async remove(id) {
        const deleteResult = await this.rifasRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException(`Rifa with ID "${id}" not found`);
        }
    }
};
exports.RifasService = RifasService;
exports.RifasService = RifasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rifa_entity_1.Rifa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RifasService);
//# sourceMappingURL=rifas.service.js.map