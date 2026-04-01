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
exports.RifasController = void 0;
const common_1 = require("@nestjs/common");
const rifas_service_1 = require("./rifas.service");
const create_rifa_dto_1 = require("./dto/create-rifa.dto");
const update_rifa_dto_1 = require("./dto/update-rifa.dto");
const passport_1 = require("@nestjs/passport");
let RifasController = class RifasController {
    constructor(rifasService) {
        this.rifasService = rifasService;
    }
    create(req, createRifaDto) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.create(tenant_id, createRifaDto);
    }
    findAll(req) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.findAll(tenant_id);
    }
    findOne(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.findOne(tenant_id, id);
    }
    update(req, id, updateRifaDto) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.update(tenant_id, id, updateRifaDto);
    }
    remove(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.remove(tenant_id, id);
    }
};
exports.RifasController = RifasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rifa_dto_1.CreateRifaDto]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_rifa_dto_1.UpdateRifaDto]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "remove", null);
exports.RifasController = RifasController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('rifas'),
    __metadata("design:paramtypes", [rifas_service_1.RifasService])
], RifasController);
//# sourceMappingURL=rifas.controller.js.map