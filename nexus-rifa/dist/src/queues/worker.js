"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const payment_consumer_1 = require("./consumers/payment.consumer");
const whatsapp_consumer_1 = require("./consumers/whatsapp.consumer");
const email_consumer_1 = require("./consumers/email.consumer");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    app.select(app_module_1.AppModule).get(payment_consumer_1.PaymentConsumer);
    app.select(app_module_1.AppModule).get(whatsapp_consumer_1.WhatsappConsumer);
    app.select(app_module_1.AppModule).get(email_consumer_1.EmailConsumer);
}
bootstrap();
//# sourceMappingURL=worker.js.map