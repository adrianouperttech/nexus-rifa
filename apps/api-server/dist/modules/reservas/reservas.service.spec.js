"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reservas_service_1 = require("./reservas.service");
const typeorm_1 = require("@nestjs/typeorm");
const reserva_entity_1 = require("./entities/reserva.entity");
const rifas_service_1 = require("../rifas/rifas.service");
const email_service_1 = require("../../integrations/email/email.service");
const whatsapp_service_1 = require("../../integrations/whatsapp/whatsapp.service");
const logger_service_1 = require("../../common/logger/logger.service");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
        findOne: jest.fn(),
        save: jest.fn(),
    },
};
describe('ReservasService', () => {
    let service;
    let rifasService;
    beforeEach(async () => {
        jest.clearAllMocks();
        mockQueryRunner.manager.findOne.mockReset();
        mockQueryRunner.manager.save.mockReset();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                reservas_service_1.ReservasService,
                { provide: (0, typeorm_1.getRepositoryToken)(reserva_entity_1.Reserva), useFactory: () => ({ create: jest.fn().mockImplementation((dto) => dto) }) },
                { provide: rifas_service_1.RifasService, useFactory: () => ({ findOne: jest.fn() }) },
                { provide: email_service_1.EmailService, useValue: { send: jest.fn() } },
                { provide: whatsapp_service_1.WhatsappService, useValue: { send: jest.fn() } },
                { provide: logger_service_1.LoggerService, useValue: { log: jest.fn(), error: jest.fn() } },
                { provide: typeorm_2.Connection, useFactory: () => ({ createQueryRunner: jest.fn(() => mockQueryRunner) }) },
            ],
        }).compile();
        service = module.get(reservas_service_1.ReservasService);
        rifasService = module.get(rifas_service_1.RifasService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        const createReservaDto = { rifa_id: '1', numero: 1, nome: 'test', email: 'test@example.com', whatsapp: '12345' };
        const rifa = { id: '1', limite: 100, nome: 'Test Rifa' };
        it('should throw ConflictException if reserva already exists', async () => {
            jest.spyOn(rifasService, 'findOne').mockResolvedValue(rifa);
            mockQueryRunner.manager.findOne.mockResolvedValue({});
            await expect(service.create(createReservaDto, '1')).rejects.toThrow(common_1.ConflictException);
            expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
            expect(mockQueryRunner.manager.findOne).toHaveBeenCalled();
            expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
            expect(mockQueryRunner.commitTransaction).not.toHaveBeenCalled();
            expect(mockQueryRunner.manager.save).not.toHaveBeenCalled();
        });
        it('should create a reserva successfully', async () => {
            jest.spyOn(rifasService, 'findOne').mockResolvedValue(rifa);
            mockQueryRunner.manager.findOne.mockResolvedValue(null);
            mockQueryRunner.manager.save.mockResolvedValue(Object.assign(Object.assign({}, createReservaDto), { id: 'new-id' }));
            await service.create(createReservaDto, '1');
            expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
            expect(mockQueryRunner.manager.findOne).toHaveBeenCalled();
            expect(mockQueryRunner.manager.save).toHaveBeenCalled();
            expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
            expect(mockQueryRunner.rollbackTransaction).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=reservas.service.spec.js.map