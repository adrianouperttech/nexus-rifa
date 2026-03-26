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
const webhook_validation_service_1 = require("../../common/security/webhook-validation.service");
const passport_1 = require("@nestjs/passport");
let PagamentosController = class PagamentosController {
    pagamentosService;
    webhookValidationService;
    constructor(pagamentosService, webhookValidationService) {
        this.pagamentosService = pagamentosService;
        this.webhookValidationService = webhookValidationService;
    }
    create(createPagamentoDto) {
        return this.pagamentosService.create(createPagamentoDto);
    }
    async handleWebhook(req, payload) {
        const signature = req.headers['x-hub-signature'];
        const isValid = this.webhookValidationService.validate(req.body, signature);
        if (!isValid) {
            throw new Error('Invalid webhook signature');
        }
        const { transacao_id, status } = payload;
        await this.pagamentosService.handlePagamentoWebhook(transacao_id, status);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pagamento_dto_1.CreatePagamentoDto]),
    __metadata("design:returntype", void 0)
], PagamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('webhook')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "handleWebhook", null);
PagamentosController = __decorate([
    (0, common_1.Controller)('pagamentos'),
    __metadata("design:paramtypes", [pagamentos_service_1.PagamentosService,
        webhook_validation_service_1.WebhookValidationService])
], PagamentosController);
exports.PagamentosController = PagamentosController;
//# sourceMappingURL=pagamentos.controller.js.map