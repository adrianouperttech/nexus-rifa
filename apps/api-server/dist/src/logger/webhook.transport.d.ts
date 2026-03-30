import Transport from 'winston-transport';
export declare class WebhookTransport extends Transport {
    private webhookUrl;
    constructor(opts: any);
    log(info: any, callback: () => void): void;
}
