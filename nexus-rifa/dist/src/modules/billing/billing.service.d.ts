import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { PlansService } from '../plans/plans.service';
import MercadoPago from 'mercadopago';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
export declare class BillingService {
    private readonly subscriptionRepository;
    private readonly plansService;
    private readonly usersService;
    private readonly tenantsService;
    private readonly mercadoPago;
    private preApprovalPlanClient;
    private preApprovalClient;
    constructor(subscriptionRepository: Repository<Subscription>, plansService: PlansService, usersService: UsersService, tenantsService: TenantsService, mercadoPago: MercadoPago);
    findByTenantId(tenant_id: string): Promise<Subscription | null>;
    createSubscription(tenant_id: string, plan_id: string, user_id: string): Promise<{
        init_point: string;
    }>;
    handleWebhook(notification: any): Promise<void>;
}
