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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RafflesController = void 0;
const common_1 = require("@nestjs/common");
const raffles_service_1 = require("./services/raffles.service");
const create_raffle_dto_1 = require("./dto/create-raffle.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let RafflesController = class RafflesController {
    rafflesService;
    constructor(rafflesService) {
        this.rafflesService = rafflesService;
    }
    create(createRaffleDto) {
        return this.rafflesService.create(createRaffleDto);
    }
    findAll() {
        return this.rafflesService.findAll();
    }
    findOne(id) {
        return this.rafflesService.findOne(+id);
    }
    draw(id) {
        return this.rafflesService.draw(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_raffle_dto_1.CreateRaffleDto !== "undefined" && create_raffle_dto_1.CreateRaffleDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RafflesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RafflesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RafflesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/draw'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RafflesController.prototype, "draw", null);
RafflesController = __decorate([
    (0, common_1.Controller)('raffles'),
    __metadata("design:paramtypes", [typeof (_a = typeof raffles_service_1.RafflesService !== "undefined" && raffles_service_1.RafflesService) === "function" ? _a : Object])
], RafflesController);
exports.RafflesController = RafflesController;
//# sourceMappingURL=raffles.controller.js.map