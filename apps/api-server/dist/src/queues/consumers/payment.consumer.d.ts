import { Job } from 'bull';
export declare class PaymentConsumer {
    process(job: Job<unknown>): Promise<any>;
}
