import { Injectable, Scope, Inject } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { Request } from 'express';

const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private context?: string;

  constructor(@Inject('REQUEST') private readonly request?: Request) {}

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    winstonLogger.log('info', message, { context: this.context || context });
  }

  error(message: any, trace?: string, context?: string) {
    winstonLogger.error(message, { trace, context: this.context || context });
  }

  warn(message: any, context?: string) {
    winstonLogger.warn(message, { context: this.context || context });
  }

  debug(message: any, context?: string) {
    winstonLogger.debug(message, { context: this.context || context });
  }

  verbose(message: any, context?: string) {
    winstonLogger.verbose(message, { context: this.context || context });
  }
}
