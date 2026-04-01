import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    private subscriptionRepository;
    constructor(subscriptionRepository: Repository<Subscription>);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription | null>;
    update(id: string, updateSubscriptionDto: any): Promise<Subscription | null>;
    remove(id: string): Promise<any>;
}
