"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reservas_controller_1 = require("./reservas.controller");
const reservas_service_1 = require("./reservas.service");
const typeorm_1 = require("@nestjs/typeorm");
const reserva_entity_1 = require("./entities/reserva.entity");
const rifas_service_1 = require("../rifas/rifas.service");
const email_service_1 = require("../../integrations/email/email.service");
const whatsapp_service_1 = require("../../integrations/whatsapp/whatsapp.service");
const logger_service_1 = require("../../common/logger/logger.service");
const typeorm_2 = require("typeorm");
describe('ReservasController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reservas_controller_1.ReservasController],
            providers: [
                reservas_service_1.ReservasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(reserva_entity_1.Reserva),
                    useValue: {},
                },
                {
                    provide: rifas_service_1.RifasService,
                    useValue: {},
                },
                {
                    provide: email_service_1.EmailService,
                    useValue: {},
                },
                {
                    provide: whatsapp_service_1.WhatsappService,
                    useValue: {},
                },
                {
                    provide: logger_service_1.LoggerService,
                    useValue: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
                },
                {
                    provide: typeorm_2.Connection,
                    useValue: {
                        createQueryRunner: jest.fn().mockReturnValue({
                            connect: jest.fn(),
                            startTransaction: jest.fn(),
                            commitTransaction: jest.fn(),
                            rollbackTransaction: jest.fn(),
                            release: jest.fn(),
                            manager: { save: jest.fn(), findOne: jest.fn() },
                        }),
                    },
                },
            ],
        }).compile();
        controller = module.get(reservas_controller_1.ReservasController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=reservas.controller.spec.js.map