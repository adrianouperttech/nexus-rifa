import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { LoggerService } from '../../common/logger/logger.service';
import { PreApproval } from 'mercadopago';

// Mocking MercadoPago PreApproval
const mockPreApprovalCreate = jest.fn();
const mockPreApprovalGet = jest.fn();
jest.mock('mercadopago', () => ({
  ...jest.requireActual('mercadopago'),
  PreApproval: jest.fn().mockImplementation(() => ({
    create: mockPreApprovalCreate,
    get: mockPreApprovalGet,
  })),
}));

describe('BillingService', () => {
  let service: BillingService;
  let subscriptionRepository: any;

  beforeAll(() => {
    process.env.MP_ACCESS_TOKEN = 'test-token';
    process.env.MP_PLAN_ID = 'test-plan-id';
  });

  beforeEach(async () => {
    mockPreApprovalCreate.mockClear();
    mockPreApprovalGet.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: getRepositoryToken(Subscription),
          useFactory: () => ({
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          }),
        },
        {
          provide: LoggerService,
          useValue: {
            error: jest.fn(),
            warn: jest.fn(),
            log: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
    subscriptionRepository = module.get(getRepositoryToken(Subscription));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSubscription', () => {
    it('should create a subscription successfully', async () => {
      const createDto = {
        reason: 'Test Subscription',
        price: 100,
        payer_email: 'test@test.com',
        tenant_id: 'tenant-1',
      };
      const mpResponse = {
        id: 'mp-sub-id',
        status: 'pending',
      };
      mockPreApprovalCreate.mockResolvedValue(mpResponse);

      const result = await service.createSubscription(createDto);

      expect(mockPreApprovalCreate).toHaveBeenCalled();
      expect(subscriptionRepository.create).toHaveBeenCalledWith({
        id: mpResponse.id,
        tenant_id: createDto.tenant_id,
        status: mpResponse.status,
      });
      expect(subscriptionRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mpResponse);
    });
  });

  describe('webhook', () => {
    it('should update subscription status on preapproval event', async () => {
      const webhookBody = {
        type: 'preapproval',
        data: { id: 'mp-preapproval-id' },
      };
      const preapprovalData = {
        id: 'mp-sub-id',
        status: 'authorized',
      };
      const subscription = { id: 'mp-sub-id', status: 'pending' };

      mockPreApprovalGet.mockResolvedValue(preapprovalData);
      jest
        .spyOn(subscriptionRepository, 'findOne')
        .mockResolvedValue(subscription);

      await service.webhook(webhookBody);

      expect(mockPreApprovalGet).toHaveBeenCalledWith({
        id: webhookBody.data.id,
      });
      expect(subscriptionRepository.findOne).toHaveBeenCalledWith({
        where: { id: preapprovalData.id },
      });
      expect(subscriptionRepository.save).toHaveBeenCalledWith({
        ...subscription,
        status: preapprovalData.status,
      });
    });
  });
});
