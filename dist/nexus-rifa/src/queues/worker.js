"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConsumer = exports.WhatsappConsumer = exports.PaymentsConsumer = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const bull_1 = require("@nestjs/bull");
let PaymentsConsumer = class PaymentsConsumer extends bull_1.WorkerHost {
    async process(job) {
        console.log('Processing payment:', job.data);
    }
};
exports.PaymentsConsumer = PaymentsConsumer;
exports.PaymentsConsumer = PaymentsConsumer = __decorate([
    (0, bull_1.Processor)('payments')
], PaymentsConsumer);
let WhatsappConsumer = class WhatsappConsumer extends bull_1.WorkerHost {
    async process(job) {
        console.log('Sending WhatsApp message:', job.data);
    }
};
exports.WhatsappConsumer = WhatsappConsumer;
exports.WhatsappConsumer = WhatsappConsumer = __decorate([
    (0, bull_1.Processor)('whatsapp')
], WhatsappConsumer);
let EmailConsumer = class EmailConsumer extends bull_1.WorkerHost {
    async process(job) {
        console.log('Sending email:', job.data);
    }
};
exports.EmailConsumer = EmailConsumer;
exports.EmailConsumer = EmailConsumer = __decorate([
    (0, bull_1.Processor)('email')
], EmailConsumer);
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    app.select(QueuesModule);
}
bootstrap();
//# sourceMappingURL=worker.js.map