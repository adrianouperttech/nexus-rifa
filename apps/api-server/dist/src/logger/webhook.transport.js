"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookTransport = void 0;
const winston_transport_1 = require("winston-transport");
const axios_1 = require("axios");
class WebhookTransport extends winston_transport_1.default {
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