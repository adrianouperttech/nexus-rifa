"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuesModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const payment_consumer_1 = require("./consumers/payment.consumer");
const whatsapp_consumer_1 = require("./consumers/whatsapp.consumer");
const email_consumer_1 = require("./consumers/email.consumer");
let QueuesModule = class QueuesModule {
};
exports.QueuesModule = QueuesModule;
exports.QueuesModule = QueuesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            bull_1.BullModule.registerQueue({ name: 'payment' }, { name: 'whatsapp' }, { name: 'email' }),
        ],
        providers: [payment_consumer_1.PaymentConsumer, whatsapp_consumer_1.WhatsappConsumer, email_consumer_1.EmailConsumer],
    })
], QueuesModule);
//# sourceMappingURL=queues.module.js.map