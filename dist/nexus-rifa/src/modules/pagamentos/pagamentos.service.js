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
exports.PagamentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagamento_entity_1 = require("./entities/pagamento.entity");
const reservas_service_1 = require("../reservas/reservas.service");
const uuid_1 = require("uuid");
let PagamentosService = class PagamentosService {
    pagamentoRepository;
    reservasService;
    constructor(pagamentoRepository, reservasService) {
        this.pagamentoRepository = pagamentoRepository;
        this.reservasService = reservasService;
    }
    async create(tenant_id, createPagamentoDto) {
        const { reserva_id } = createPagamentoDto;
        const reserva = await this.reservasService.findOne(tenant_id, reserva_id);
        if (reserva.status !== 'disponivel') {
            throw new common_1.ConflictException(`Reserva ${reserva_id} não está disponível para pagamento.`);
        }
        const existingPagamento = await this.pagamentoRepository.findOne({
            where: { reserva_id, status: 'pendente' },
        });
        if (existingPagamento) {
            throw new common_1.ConflictException(`Já existe um pagamento pendente para a reserva ${reserva_id}.`);
        }
        const transacao_id = (0, uuid_1.v4)();
        const qr_code_data = `https://pix.example.com/charge/${transacao_id}`;
        const pagamento = this.pagamentoRepository.create({
            reserva_id,
            status: 'pendente',
            gateway_pagamento: 'gateway-simulado',
            transacao_id,
        });
        await this.pagamentoRepository.save(pagamento);
        await this.reservasService.updateStatus(tenant_id, reserva_id, 'pendente');
        return {
            message: 'Pagamento PIX criado. Aguardando pagamento.',
            transacao_id,
            qr_code_data,
        };
    }
    async handlePagamentoWebhook(transacao_id, status) {
        const pagamento = await this.pagamentoRepository.findOne({
            where: { transacao_id },
            relations: ['reserva'],
        });
        if (!pagamento) {
            throw new common_1.NotFoundException(`Pagamento com transacao_id "${transacao_id}" não encontrado.`);
        }
        if (pagamento.status !== 'pendente') {
            console.log(`Webhook recebido para pagamento ${pagamento.id} que não está pendente.`);
            return;
        }
        pagamento.status = status;
        await this.pagamentoRepository.save(pagamento);
        await this.reservasService.updateStatus(pagamento.reserva.tenant_id, pagamento.reserva_id, status);
    }
};
exports.PagamentosService = PagamentosService;
exports.PagamentosService = PagamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pagamento_entity_1.Pagamento)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => reservas_service_1.ReservasService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        reservas_service_1.ReservasService])
], PagamentosService);
//# sourceMappingURL=pagamentos.service.js.map