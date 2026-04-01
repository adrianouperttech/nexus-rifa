import { Request } from 'express';
export declare class LoggerService {
    private readonly request?;
    private context?;
    constructor(request?: Request);
    setContext(context: string): void;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
}
