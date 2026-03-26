import { WorkerHost } from '@nestjs/bull';
import { Job } from 'bull';
export declare class PaymentsConsumer extends WorkerHost {
    process(job: Job<unknown>): Promise<any>;
}
export declare class WhatsappConsumer extends WorkerHost {
    process(job: Job<unknown>): Promise<any>;
}
export declare class EmailConsumer extends WorkerHost {
    process(job: Job<unknown>): Promise<any>;
}
