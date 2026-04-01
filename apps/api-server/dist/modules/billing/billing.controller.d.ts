import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';
export declare class BillingController {
    private readonly logger;
    private readonly billingService;
    constructor(logger: LoggerService, billingService: BillingService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<any>;
    webhook(body: any): Promise<any>;
    getSubscription(id: string): Promise<import("./entities/subscription.entity").Subscription>;
}
