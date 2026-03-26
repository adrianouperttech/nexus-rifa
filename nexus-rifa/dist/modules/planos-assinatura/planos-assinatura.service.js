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
exports.PlanosAssinaturaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plano_assinatura_entity_1 = require("./entities/plano-assinatura.entity");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let PlanosAssinaturaService = class PlanosAssinaturaService {
    planoAssinaturaRepository;
    httpService;
    configService;
    mercadoPagoApiUrl;
    mercadoPagoAccessToken;
    constructor(planoAssinaturaRepository, httpService, configService) {
        this.planoAssinaturaRepository = planoAssinaturaRepository;
        this.httpService = httpService;
        this.configService = configService;
        this.mercadoPagoApiUrl = this.configService.get('MERCADO_PAGO_API_URL');
        this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN');
    }
    async create(createPlanoAssinaturaDto) {
        const { reason, auto_recurring, back_url } = createPlanoAssinaturaDto;
        const data = {
            reason: reason,
            auto_recurring: auto_recurring,
            back_url: back_url,
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.mercadoPagoApiUrl}/preapproval_plan`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
                },
            }));
            const responseData = response.data;
            const newPlanoAssinatura = this.planoAssinaturaRepository.create({
                id: responseData.id,
                reason: responseData.reason,
                status: responseData.status,
            });
            return await this.planoAssinaturaRepository.save(newPlanoAssinatura);
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data, error.response.status);
        }
    }
};
PlanosAssinaturaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plano_assinatura_entity_1.PlanoAssinatura)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], PlanosAssinaturaService);
exports.PlanosAssinaturaService = PlanosAssinaturaService;
//# sourceMappingURL=planos-assinatura.service.js.map