"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const pagamentos_service_1 = require("./pagamentos.service");
const typeorm_1 = require("@nestjs/typeorm");
const pagamento_entity_1 = require("./entities/pagamento.entity");
const reservas_service_1 = require("../reservas/reservas.service");
const logger_service_1 = require("../../common/logger/logger.service");
const common_1 = require("@nestjs/common");
const mockPaymentCreate = jest.fn();
const mockPaymentGet = jest.fn();
jest.mock('mercadopago', () => (Object.assign(Object.assign({}, jest.requireActual('mercadopago')), { Payment: jest.fn().mockImplementation(() => ({
        create: mockPaymentCreate,
        get: mockPaymentGet,
    })) })));
describe('PagamentosService', () => {
    let service;
    let reservasService;
    let pagamentoRepository;
    beforeAll(() => {
        process.env.MERCADOPAGO_ACCESS_TOKEN = 'test-token';
    });
    beforeEach(async () => {
        mockPaymentCreate.mockClear();
        mockPaymentGet.mockClear();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pagamentos_service_1.PagamentosService,
                { provide: (0, typeorm_1.getRepositoryToken)(pagamento_entity_1.Pagamento), useFactory: () => ({ save: jest.fn(), findOne: jest.fn(), create: jest.fn() }) },
                { provide: reservas_service_1.ReservasService, useFactory: () => ({ findOne: jest.fn(), updateStatus: jest.fn() }) },
                { provide: logger_service_1.LoggerService, useValue: { error: jest.fn(), warn: jest.fn(), log: jest.fn() } },
            ],
        }).compile();
        service = module.get(pagamentos_service_1.PagamentosService);
        reservasService = module.get(reservas_service_1.ReservasService);
        pagamentoRepository = module.get((0, typeorm_1.getRepositoryToken)(pagamento_entity_1.Pagamento));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        const createPagamentoDto = { reserva_id: '1' };
        const tenant_id = '1';
        it('should throw ConflictException if reserva is not disponivel', async () => {
            jest.spyOn(reservasService, 'findOne').mockResolvedValue({ status: 'paga' });
            await expect(service.create(tenant_id, createPagamentoDto)).rejects.toThrow(common_1.ConflictException);
        });
        it('should create a payment successfully', async () => {
            const reserva = { id: '1', tenant_id, status: 'disponivel', rifa: { valor_cota: 10, titulo: 'test rifa' }, email: 'test@test.com', nome: 'Test User' };
            jest.spyOn(reservasService, 'findOne').mockResolvedValue(reserva);
            jest.spyOn(pagamentoRepository, 'findOne').mockResolvedValue(null);
            const paymentResponse = {
                id: 12345,
                point_of_interaction: {
                    transaction_data: {
                        qr_code: 'QR_CODE_DATA',
                        qr_code_base64: 'QR_CODE_BASE64',
                    },
                },
            };
            mockPaymentCreate.mockResolvedValue(paymentResponse);
            jest.spyOn(pagamentoRepository, 'create').mockReturnValue({});
            const result = await service.create(tenant_id, createPagamentoDto);
            expect(reservasService.findOne).toHaveBeenCalledWith(tenant_id, createPagamentoDto.reserva_id);
            expect(mockPaymentCreate).toHaveBeenCalled();
            expect(pagamentoRepository.save).toHaveBeenCalled();
            expect(reservasService.updateStatus).toHaveBeenCalledWith(tenant_id, reserva.id, 'pendente');
            expect(result).toHaveProperty('qr_code_data', 'QR_CODE_DATA');
        });
    });
    describe('handlePagamentoWebhook', () => {
        it('should update reserva to confirmada if payment is approved', async () => {
            const notification = { type: 'payment', data: { id: '12345' } };
            const paymentInfo = { id: 12345, status: 'approved' };
            const pagamento = { id: '1', status: 'pendente', reserva_id: '1', reserva: { id: '1', tenant_id: 'tenant-1' } };
            mockPaymentGet.mockResolvedValue(paymentInfo);
            jest.spyOn(pagamentoRepository, 'findOne').mockResolvedValue(pagamento);
            await service.handlePagamentoWebhook(notification);
            expect(pagamentoRepository.findOne).toHaveBeenCalledWith({ where: { transacao_id: '12345' }, relations: ['reserva'] });
            expect(pagamentoRepository.save).toHaveBeenCalledWith(Object.assign(Object.assign({}, pagamento), { status: 'pago' }));
            expect(reservasService.updateStatus).toHaveBeenCalledWith('tenant-1', '1', 'confirmada');
        });
        it('should update reserva to disponivel if payment is cancelled', async () => {
            const notification = { type: 'payment', data: { id: '12345' } };
            const paymentInfo = { id: 12345, status: 'cancelled' };
            const pagamento = { id: '1', status: 'pendente', reserva_id: '1', reserva: { id: '1', tenant_id: 'tenant-1' } };
            mockPaymentGet.mockResolvedValue(paymentInfo);
            jest.spyOn(pagamentoRepository, 'findOne').mockResolvedValue(pagamento);
            await service.handlePagamentoWebhook(notification);
            expect(pagamentoRepository.findOne).toHaveBeenCalledWith({ where: { transacao_id: '12345' }, relations: ['reserva'] });
            expect(pagamentoRepository.save).toHaveBeenCalledWith(Object.assign(Object.assign({}, pagamento), { status: 'cancelado' }));
            expect(reservasService.updateStatus).toHaveBeenCalledWith('tenant-1', '1', 'disponivel');
        });
    });
});
//# sourceMappingURL=pagamentos.service.spec.js.map