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
exports.AssinaturasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assinatura_entity_1 = require("./entities/assinatura.entity");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let AssinaturasService = class AssinaturasService {
    constructor(assinaturaRepository, httpService, configService) {
        this.assinaturaRepository = assinaturaRepository;
        this.httpService = httpService;
        this.configService = configService;
        this.mercadoPagoApiUrl = this.configService.get('MERCADO_PAGO_API_URL', 'https://api.mercadopago.com');
        this.mercadoPagoAccessToken = this.configService.get('MERCADO_PAGO_ACCESS_TOKEN', '');
    }
    async create(tenant_id, createAssinaturaDto) {
        const { plan_id, payer_email, card_token_id } = createAssinaturaDto;
        const data = {
            preapproval_plan_id: plan_id,
            reason: `Assinatura do plano ${plan_id}`,
            payer_email: payer_email,
            card_token_id: card_token_id,
            back_url: 'https://www.mercadopago.com.br',
            status: 'authorized',
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.mercadoPagoApiUrl}/preapproval`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
                },
            }));
            const responseData = response.data;
            const newAssinatura = this.assinaturaRepository.create({
                id: responseData.id,
                plan_id: responseData.preapproval_plan_id,
                payer_email: responseData.payer_email,
                status: responseData.status,
                start_date: responseData.date_created,
                end_date: responseData.auto_recurring.end_date,
                next_payment_date: responseData.next_payment_date,
                tenant_id: tenant_id,
            });
            return await this.assinaturaRepository.save(newAssinatura);
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data, error.response.status);
        }
    }
    async handleWebhook(data) {
        if (data.type === 'preapproval') {
            const preapprovalId = data.data.id;
            try {
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.mercadoPagoApiUrl}/preapproval/${preapprovalId}`, {
                    headers: {
                        Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
                    },
                }));
                const preapprovalData = response.data;
                const assinatura = await this.assinaturaRepository.findOne({
                    where: { id: preapprovalId },
                });
                if (assinatura) {
                    assinatura.status = preapprovalData.status;
                    await this.assinaturaRepository.save(assinatura);
                }
            }
            catch (error) {
                throw new common_1.HttpException(error.response.data, error.response.status);
            }
        }
        return { message: 'Webhook received' };
    }
    async findByTenantId(tenantId) {
        return this.assinaturaRepository.findOne({
            where: { tenant_id: tenantId },
            order: { start_date: 'DESC' },
        });
    }
};
exports.AssinaturasService = AssinaturasService;
exports.AssinaturasService = AssinaturasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assinatura_entity_1.Assinatura)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], AssinaturasService);
//# sourceMappingURL=assinaturas.service.js.map