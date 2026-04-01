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
describe('ReservasController', () => {
    let controller;
    const mockReservaRepository = {};
    const mockRifasService = {};
    const mockEmailService = {};
    const mockWhatsappService = {};
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reservas_controller_1.ReservasController],
            providers: [
                reservas_service_1.ReservasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(reserva_entity_1.Reserva),
                    useValue: mockReservaRepository,
                },
                {
                    provide: rifas_service_1.RifasService,
                    useValue: mockRifasService,
                },
                {
                    provide: email_service_1.EmailService,
                    useValue: mockEmailService,
                },
                {
                    provide: whatsapp_service_1.WhatsappService,
                    useValue: mockWhatsappService,
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