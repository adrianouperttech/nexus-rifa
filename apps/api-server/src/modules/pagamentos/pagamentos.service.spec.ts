import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosService } from './pagamentos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { ReservasService } from '../reservas/reservas.service';
import { LoggerService } from '../../common/logger/logger.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { ConflictException } from '@nestjs/common';

// Mocking MercadoPago Payment
const mockPaymentCreate = jest.fn();
const mockPaymentGet = jest.fn();
jest.mock('mercadopago', () => ({
  ...jest.requireActual('mercadopago'),
  Payment: jest.fn().mockImplementation(() => ({
    create: mockPaymentCreate,
    get: mockPaymentGet,
  })),
}));

describe('PagamentosService', () => {
  let service: PagamentosService;
  let reservasService: ReservasService;
  let pagamentoRepository: any;

  beforeAll(() => {
    process.env.MERCADOPAGO_ACCESS_TOKEN = 'test-token';
  });

  beforeEach(async () => {
    mockPaymentCreate.mockClear();
    mockPaymentGet.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentosService,
        {
          provide: getRepositoryToken(Pagamento),
          useFactory: () => ({
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          }),
        },
        {
          provide: ReservasService,
          useFactory: () => ({ findOne: jest.fn(), updateStatus: jest.fn() }),
        },
        {
          provide: LoggerService,
          useValue: { error: jest.fn(), warn: jest.fn(), log: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PagamentosService>(PagamentosService);
    reservasService = module.get<ReservasService>(ReservasService);
    pagamentoRepository = module.get(getRepositoryToken(Pagamento));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createPagamentoDto: CreatePagamentoDto = { reserva_id: '1' };
    const tenant_id = '1';

    it('should throw ConflictException if reserva is not disponivel', async () => {
      jest
        .spyOn(reservasService, 'findOne')
        .mockResolvedValue({ status: 'paga' } as any);
      await expect(
        service.create(tenant_id, createPagamentoDto),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a payment successfully', async () => {
      const reserva = {
        id: '1',
        tenant_id,
        status: 'disponivel',
        rifa: { valor_cota: 10, titulo: 'test rifa' },
        email: 'test@test.com',
        nome: 'Test User',
      };
      jest.spyOn(reservasService, 'findOne').mockResolvedValue(reserva as any);
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
      jest.spyOn(pagamentoRepository, 'create').mockReturnValue({} as any);

      const result = await service.create(tenant_id, createPagamentoDto);

      expect(reservasService.findOne).toHaveBeenCalledWith(
        tenant_id,
        createPagamentoDto.reserva_id,
      );
      expect(mockPaymentCreate).toHaveBeenCalled();
      expect(pagamentoRepository.save).toHaveBeenCalled();
      expect(reservasService.updateStatus).toHaveBeenCalledWith(
        tenant_id,
        reserva.id,
        'pendente',
      );
      expect(result).toHaveProperty('qr_code_data', 'QR_CODE_DATA');
    });
  });

  describe('handlePagamentoWebhook', () => {
    it('should update reserva to confirmada if payment is approved', async () => {
      const notification = { type: 'payment', data: { id: '12345' } };
      const paymentInfo = { id: 12345, status: 'approved' };
      const pagamento = {
        id: '1',
        status: 'pendente',
        reserva_id: '1',
        reserva: { id: '1', tenant_id: 'tenant-1' },
      };

      mockPaymentGet.mockResolvedValue(paymentInfo);
      jest.spyOn(pagamentoRepository, 'findOne').mockResolvedValue(pagamento);

      await service.handlePagamentoWebhook(notification);

      expect(pagamentoRepository.findOne).toHaveBeenCalledWith({
        where: { transacao_id: '12345' },
        relations: ['reserva'],
      });
      expect(pagamentoRepository.save).toHaveBeenCalledWith({
        ...pagamento,
        status: 'pago',
      });
      expect(reservasService.updateStatus).toHaveBeenCalledWith(
        'tenant-1',
        '1',
        'confirmada',
      );
    });

    it('should update reserva to disponivel if payment is cancelled', async () => {
      const notification = { type: 'payment', data: { id: '12345' } };
      const paymentInfo = { id: 12345, status: 'cancelled' };
      const pagamento = {
        id: '1',
        status: 'pendente',
        reserva_id: '1',
        reserva: { id: '1', tenant_id: 'tenant-1' },
      };

      mockPaymentGet.mockResolvedValue(paymentInfo);
      jest.spyOn(pagamentoRepository, 'findOne').mockResolvedValue(pagamento);

      await service.handlePagamentoWebhook(notification);

      expect(pagamentoRepository.findOne).toHaveBeenCalledWith({
        where: { transacao_id: '12345' },
        relations: ['reserva'],
      });
      expect(pagamentoRepository.save).toHaveBeenCalledWith({
        ...pagamento,
        status: 'cancelado',
      });
      expect(reservasService.updateStatus).toHaveBeenCalledWith(
        'tenant-1',
        '1',
        'disponivel',
      );
    });
  });
});
