import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: string): Promise<import("./entities/subscription.entity").Subscription>;
    update(id: string, updateSubscriptionDto: any): Promise<import("./entities/subscription.entity").Subscription>;
    remove(id: string): Promise<any>;
}
