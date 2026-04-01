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
const mercadopago_1 = require("mercadopago");
let PagamentosService = class PagamentosService {
    constructor(pagamentoRepository, reservasService) {
        this.pagamentoRepository = pagamentoRepository;
        this.reservasService = reservasService;
        const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
        if (!accessToken) {
            throw new common_1.InternalServerErrorException('Chave de acesso do Mercado Pago não foi configurada (MERCADOPAGO_ACCESS_TOKEN).');
        }
        this.mercadopago = new mercadopago_1.MercadoPagoConfig({ accessToken });
    }
    async create(tenant_id, createPagamentoDto) {
        var _a, _b;
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
        const payment = new mercadopago_1.Payment(this.mercadopago);
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);
        try {
            const paymentResponse = await payment.create({
                body: {
                    transaction_amount: reserva.rifa.valor_cota,
                    description: `Pagamento da reserva para a rifa \"${reserva.rifa.titulo}\"`,
                    payment_method_id: 'pix',
                    date_of_expiration: expirationDate.toISOString(),
                    payer: {
                        email: reserva.email,
                        first_name: reserva.nome.split(' ')[0],
                        last_name: reserva.nome.split(' ').slice(1).join(' ') || undefined,
                    },
                    notification_url: `${process.env.APP_URL}/pagamentos/webhook`,
                },
            });
            if (!paymentResponse.id || !paymentResponse.point_of_interaction) {
                throw new common_1.InternalServerErrorException('Falha ao criar pagamento PIX: resposta inválida do gateway.');
            }
            const transacao_id = String(paymentResponse.id);
            const qr_code_data = (_a = paymentResponse.point_of_interaction.transaction_data) === null || _a === void 0 ? void 0 : _a.qr_code;
            const qr_code_base64 = (_b = paymentResponse.point_of_interaction.transaction_data) === null || _b === void 0 ? void 0 : _b.qr_code_base64;
            if (!qr_code_data || !qr_code_base64) {
                throw new common_1.InternalServerErrorException('Falha ao obter os dados do QR Code do gateway de pagamento.');
            }
            const novoPagamento = this.pagamentoRepository.create({
                reserva_id,
                status: 'pendente',
                gateway_pagamento: 'mercadopago',
                transacao_id,
            });
            await this.pagamentoRepository.save(novoPagamento);
            await this.reservasService.updateStatus(tenant_id, reserva_id, 'pendente');
            return {
                message: 'Pagamento PIX criado. Aguardando pagamento.',
                transacao_id,
                qr_code_data,
                qr_code_base64,
            };
        }
        catch (error) {
            console.error('Erro ao criar pagamento no Mercado Pago:', error);
            throw new common_1.InternalServerErrorException('Falha ao se comunicar com o gateway de pagamento.');
        }
    }
    async handlePagamentoWebhook(notification) {
        if (notification.type === 'payment' && notification.data && notification.data.id) {
            const paymentId = notification.data.id;
            const payment = new mercadopago_1.Payment(this.mercadopago);
            try {
                const paymentInfo = await payment.get({ id: paymentId });
                const transacao_id = String(paymentInfo.id);
                const pagamento = await this.pagamentoRepository.findOne({
                    where: { transacao_id },
                    relations: ['reserva'],
                });
                if (!pagamento) {
                    console.warn(`Pagamento com transacao_id \"${transacao_id}\" não encontrado.`);
                    return;
                }
                if (pagamento.status !== 'pendente') {
                    console.log(`Webhook recebido para pagamento ${pagamento.id} que não está pendente.`);
                    return;
                }
                let novoStatus;
                let novoStatusReserva;
                switch (paymentInfo.status) {
                    case 'approved':
                    case 'confirmed':
                        novoStatus = 'pago';
                        novoStatusReserva = 'confirmada';
                        break;
                    case 'cancelled':
                    case 'expired':
                        novoStatus = 'cancelado';
                        novoStatusReserva = 'disponivel';
                        break;
                    default:
                        return;
                }
                pagamento.status = novoStatus;
                await this.pagamentoRepository.save(pagamento);
                await this.reservasService.updateStatus(pagamento.reserva.tenant_id, pagamento.reserva_id, novoStatusReserva);
            }
            catch (error) {
                console.error('Erro ao processar webhook do Mercado Pago:', error);
                throw new common_1.InternalServerErrorException('Erro ao consultar status do pagamento no gateway.');
            }
        }
    }
};
PagamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pagamento_entity_1.Pagamento)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => reservas_service_1.ReservasService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        reservas_service_1.ReservasService])
], PagamentosService);
exports.PagamentosService = PagamentosService;
//# sourceMappingURL=pagamentos.service.js.map