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
exports.PagamentosController = void 0;
const common_1 = require("@nestjs/common");
const pagamentos_service_1 = require("./pagamentos.service");
const create_pagamento_dto_1 = require("./dto/create-pagamento.dto");
const passport_1 = require("@nestjs/passport");
const webhook_validation_service_1 = require("../../common/security/webhook-validation.service");
const throttler_1 = require("@nestjs/throttler");
const winston_1 = require("winston");
let PagamentosController = class PagamentosController {
    constructor(logger, pagamentosService, webhookValidationService) {
        this.logger = logger;
        this.pagamentosService = pagamentosService;
        this.webhookValidationService = webhookValidationService;
    }
    create(req, createPagamentoDto) {
        const tenant_id = req.user.tenant_id;
        return this.pagamentosService.create(tenant_id, createPagamentoDto);
    }
    async handleWebhook(signature, notification) {
        const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
        if (!secret) {
            this.logger.error('MERCADOPAGO_WEBHOOK_SECRET não está configurado.');
            return;
        }
        const isValid = this.webhookValidationService.validate(signature, notification, secret);
        if (!isValid) {
            this.logger.warn('Assinatura de webhook do Mercado Pago inválida.');
            return;
        }
        this.logger.info('Webhook do Mercado Pago recebido e validado:', { notification });
        try {
            await this.pagamentosService.handlePagamentoWebhook(notification);
        }
        catch (error) {
            this.logger.error('Erro ao processar webhook validado:', { error });
        }
    }
};
exports.PagamentosController = PagamentosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pagamento_dto_1.CreatePagamentoDto]),
    __metadata("design:returntype", void 0)
], PagamentosController.prototype, "create", null);
__decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)('x-signature')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "handleWebhook", null);
exports.PagamentosController = PagamentosController = __decorate([
    (0, common_1.Controller)('pagamentos'),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger,
        pagamentos_service_1.PagamentosService,
        webhook_validation_service_1.WebhookValidationService])
], PagamentosController);
//# sourceMappingURL=pagamentos.controller.js.map