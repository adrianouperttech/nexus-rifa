import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('payment')
export class PaymentConsumer {
  @Process()
  async process(job: Job<unknown>): Promise<any> {
    console.log('Processing payment:', job.data);
    // TODO: Implement payment processing
  }
}
