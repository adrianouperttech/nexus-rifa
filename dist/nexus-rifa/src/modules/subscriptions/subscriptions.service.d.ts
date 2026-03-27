/// <reference types="mongoose/types/models" />
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './entities/subscription.entity';
export declare class SubscriptionsService {
    private subscriptionModel;
    constructor(subscriptionModel: Model<SubscriptionDocument>);
    create(createSubscriptionDto: any): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription | null>;
    update(id: string, updateSubscriptionDto: any): Promise<Subscription | null>;
    remove(id: string): Promise<any>;
}
