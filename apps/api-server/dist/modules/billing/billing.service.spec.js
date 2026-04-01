"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const billing_service_1 = require("./billing.service");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const mockPreApprovalCreate = jest.fn();
const mockPreApprovalGet = jest.fn();
jest.mock('mercadopago', () => (Object.assign(Object.assign({}, jest.requireActual('mercadopago')), { PreApproval: jest.fn().mockImplementation(() => ({
        create: mockPreApprovalCreate,
        get: mockPreApprovalGet,
    })) })));
describe('BillingService', () => {
    let service;
    let subscriptionRepository;
    beforeAll(() => {
        process.env.MP_ACCESS_TOKEN = 'test-token';
        process.env.MP_PLAN_ID = 'test-plan-id';
    });
    beforeEach(async () => {
        mockPreApprovalCreate.mockClear();
        mockPreApprovalGet.mockClear();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                billing_service_1.BillingService,
                { provide: (0, typeorm_1.getRepositoryToken)(subscription_entity_1.Subscription), useFactory: () => ({ save: jest.fn(), findOne: jest.fn(), create: jest.fn() }) },
                { provide: 'winston', useValue: { error: jest.fn(), log: jest.fn(), warn: jest.fn() } },
            ],
        }).compile();
        service = module.get(billing_service_1.BillingService);
        subscriptionRepository = module.get((0, typeorm_1.getRepositoryToken)(subscription_entity_1.Subscription));
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
            jest.spyOn(subscriptionRepository, 'findOne').mockResolvedValue(subscription);
            await service.webhook(webhookBody);
            expect(mockPreApprovalGet).toHaveBeenCalledWith({ id: webhookBody.data.id });
            expect(subscriptionRepository.findOne).toHaveBeenCalledWith({ where: { id: preapprovalData.id } });
            expect(subscriptionRepository.save).toHaveBeenCalledWith(Object.assign(Object.assign({}, subscription), { status: preapprovalData.status }));
        });
    });
});
//# sourceMappingURL=billing.service.spec.js.map