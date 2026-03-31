import { Module } from '@nestjs/common';
import { logger } from './logger.service';

@Module({
  providers: [
    {
      provide: 'winston',
      useValue: logger,
    },
  ],
  exports: ['winston'],
})
export class LoggerModule {}
