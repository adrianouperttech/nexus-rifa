import { Job } from 'bull';
export declare class WhatsappConsumer {
    process(job: Job<unknown>): Promise<any>;
}
