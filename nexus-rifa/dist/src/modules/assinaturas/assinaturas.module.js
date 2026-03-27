"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssinaturasModule = void 0;
const common_1 = require("@nestjs/common");
const assinaturas_controller_1 = require("./assinaturas.controller");
const assinaturas_service_1 = require("./assinaturas.service");
const typeorm_1 = require("@nestjs/typeorm");
const assinatura_entity_1 = require("./entities/assinatura.entity");
const axios_1 = require("@nestjs/axios");
let AssinaturasModule = class AssinaturasModule {
};
AssinaturasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([assinatura_entity_1.Assinatura]), axios_1.HttpModule],
        controllers: [assinaturas_controller_1.AssinaturasController],
        providers: [assinaturas_service_1.AssinaturasService],
    })
], AssinaturasModule);
exports.AssinaturasModule = AssinaturasModule;
//# sourceMappingURL=assinaturas.module.js.map