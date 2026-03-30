import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('payments')
export class PaymentsConsumer {
  @Process()
  async process(job: Job<unknown>): Promise<any> {
    console.log('Processing payment:', job.data);
    // TODO: Implement payment processing
  }
}
