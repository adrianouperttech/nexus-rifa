"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const testing_1 = require("@nestjs/testing");
const reservas_controller_1 = require("./reservas.controller");
const reservas_service_1 = require("./reservas.service");
describe('ReservasController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reservas_controller_1.ReservasController],
            providers: [reservas_service_1.ReservasService],
        }).compile();
        controller = module.get(reservas_controller_1.ReservasController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=reservas.controller.spec.js.map