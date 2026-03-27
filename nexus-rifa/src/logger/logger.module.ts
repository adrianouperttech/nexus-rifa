import { Module, Global } from '@nestjs/common';
import { logger } from './logger.config';

@Global()
@Module({
  providers: [
    {
      provide: 'LOGGER',
      useValue: logger,
    },
  ],
  exports: ['LOGGER'],
})
export class LoggerModule {}
