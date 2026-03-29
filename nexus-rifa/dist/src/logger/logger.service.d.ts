import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    private readonly logger;
    constructor();
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
    sendWebhook(url: string, message: any): Promise<void>;
}
