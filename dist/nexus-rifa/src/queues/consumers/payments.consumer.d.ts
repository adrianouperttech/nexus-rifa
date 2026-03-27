import { Job } from 'bull';
export declare class PaymentsConsumer {
    process(job: Job<unknown>): Promise<any>;
}
