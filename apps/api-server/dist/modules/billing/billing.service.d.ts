import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { LoggerService } from '../../common/logger/logger.service';
export declare class BillingService {
    private readonly logger;
    private readonly subscriptionRepository;
    private client;
    constructor(logger: LoggerService, subscriptionRepository: Repository<Subscription>);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<any>;
    webhook(body: any): Promise<any>;
    getSubscription(id: string): Promise<Subscription>;
}
