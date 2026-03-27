import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    subscribe(req: any, plan_id: string): Promise<{
        init_point: string;
    }>;
    webhook(notification: any): Promise<void>;
}
