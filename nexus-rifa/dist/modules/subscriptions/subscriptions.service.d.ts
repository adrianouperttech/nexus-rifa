import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './entities/subscription.entity';
export declare class SubscriptionsService {
    private subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(createSubscriptionDto: any): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    update(id: string, updateSubscriptionDto: any): Promise<Subscription>;
    remove(id: string): Promise<any>;
}
