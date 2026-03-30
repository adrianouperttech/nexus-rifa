import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('whatsapp')
export class WhatsappConsumer {
  @Process()
  async process(job: Job<unknown>): Promise<any> {
    console.log('Sending WhatsApp message:', job.data);
    // TODO: Implement WhatsApp sending
  }
}
