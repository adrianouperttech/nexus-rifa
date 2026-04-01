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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const mercadopago_1 = require("mercadopago");
const logger_service_1 = require("../../common/logger/logger.service");
let BillingService = class BillingService {
    constructor(logger, subscriptionRepository) {
        this.logger = logger;
        this.subscriptionRepository = subscriptionRepository;
        this.client = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MP_ACCESS_TOKEN,
        });
    }
    async createSubscription(createSubscriptionDto) {
        const subscriptionRequest = {
            reason: createSubscriptionDto.reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: createSubscriptionDto.price,
                currency_id: 'BRL',
            },
            back_url: 'https://www.google.com',
            payer_email: createSubscriptionDto.payer_email,
            preapproval_plan_id: process.env.MP_PLAN_ID,
        };
        try {
            const preApprovalClient = new mercadopago_1.PreApproval(this.client);
            const response = await preApprovalClient.create({ body: subscriptionRequest });
            const subscription = this.subscriptionRepository.create({
                id: response.id,
                tenant_id: createSubscriptionDto.tenant_id,
                status: response.status,
            });
            await this.subscriptionRepository.save(subscription);
            return response;
        }
        catch (error) {
            this.logger.error(`Erro ao criar assinatura no Mercado Pago: ${JSON.stringify(error)}`);
            throw new common_1.InternalServerErrorException('Falha ao se comunicar com o gateway de pagamento.');
        }
    }
    async webhook(body) {
        if (body.type === 'preapproval') {
            try {
                const preApprovalClient = new mercadopago_1.PreApproval(this.client);
                const preapproval = await preApprovalClient.get({ id: body.data.id });
                const subscription = await this.subscriptionRepository.findOne({
                    where: { id: preapproval.id },
                });
                if (subscription) {
                    subscription.status = preapproval.status;
                    await this.subscriptionRepository.save(subscription);
                }
                else {
                    this.logger.warn(`Assinatura com id \"${preapproval.id}\" não encontrada.`);
                }
            }
            catch (error) {
                this.logger.error(`Erro ao processar webhook de preapproval: ${body.data.id}: ${JSON.stringify(error)}`);
                throw new common_1.InternalServerErrorException('Erro ao consultar status da assinatura no gateway.');
            }
        }
        return { message: 'ok' };
    }
    async getSubscription(id) {
        return this.subscriptionRepository.findOne({ where: { id } });
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.Repository])
], BillingService);
//# sourceMappingURL=billing.service.js.map