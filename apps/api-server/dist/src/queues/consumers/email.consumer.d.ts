import { Job } from 'bull';
export declare class EmailConsumer {
    process(job: Job<unknown>): Promise<any>;
}
