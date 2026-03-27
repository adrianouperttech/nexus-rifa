import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailConsumer {
  @Process()
  async process(job: Job<unknown>): Promise<any> {
    console.log('Sending email:', job.data);
    // TODO: Implement email sending
  }
}
