import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Processor, WorkerHost } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('payments')
export class PaymentsConsumer extends WorkerHost {
  async process(job: Job<unknown>): Promise<any> {
    console.log('Processing payment:', job.data);
    // TODO: Implement payment processing
  }
}

@Processor('whatsapp')
export class WhatsappConsumer extends WorkerHost {
  async process(job: Job<unknown>): Promise<any> {
    console.log('Sending WhatsApp message:', job.data);
    // TODO: Implement WhatsApp sending
  }
}

@Processor('email')
export class EmailConsumer extends WorkerHost {
  async process(job: Job<unknown>): Promise<any> {
    console.log('Sending email:', job.data);
    // TODO: Implement email sending
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.select(QueuesModule);
}

bootstrap();
