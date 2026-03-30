"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
const webhook_transport_1 = require("./webhook.transport");
const webhookUrl = 'YOUR_WEBHOOK_URL';
exports.logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new webhook_transport_1.WebhookTransport({ webhookUrl, level: 'error' }),
    ],
});
//# sourceMappingURL=logger.config.js.map