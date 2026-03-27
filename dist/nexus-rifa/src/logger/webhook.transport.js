"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
const axios_1 = __importDefault(require("axios"));
class WebhookTransport extends winston_transport_1.default {
    webhookUrl;
    constructor(opts) {
        super(opts);
        this.webhookUrl = opts.webhookUrl;
    }
    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        if (info.level === 'error') {
            axios_1.default.post(this.webhookUrl, { content: `🚨 **${info.level.toUpperCase()}**: ${info.message}` })
                .catch(err => console.error('Error sending to webhook:', err));
        }
        callback();
    }
}
exports.WebhookTransport = WebhookTransport;
//# sourceMappingURL=webhook.transport.js.map