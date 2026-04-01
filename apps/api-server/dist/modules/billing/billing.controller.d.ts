import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
export declare class BillingController {
    private readonly logger;
    private readonly billingService;
    private readonly webhookValidationService;
    constructor(logger: LoggerService, billingService: BillingService, webhookValidationService: WebhookValidationService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<any>;
    webhook(signature: string, body: any): Promise<any>;
    getSubscription(id: string): Promise<import("./entities/subscription.entity").Subscription>;
}
