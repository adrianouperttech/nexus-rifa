"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
describe('AppController', () => {
    let appController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }).compile();
        appController = app.get(app_controller_1.AppController);
    });
    describe('root', () => {
        it('should send HTML status page', () => {
            const send = jest.fn();
            const res = {
                contentType: jest.fn().mockReturnThis(),
                send,
            };
            appController.getHello(res);
            expect(res.contentType).toHaveBeenCalledWith('text/html');
            expect(send).toHaveBeenCalledWith(expect.stringContaining('<html'));
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map