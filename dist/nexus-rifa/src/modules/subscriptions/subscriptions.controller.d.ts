import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(createSubscriptionDto: any): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: string): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: string, updateSubscriptionDto: any): Promise<import("./entities/subscription.entity").Subscription | null>;
    remove(id: string): Promise<any>;
}
