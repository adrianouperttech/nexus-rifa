import { Tenant } from '../tenants/entities/tenant.entity';
export declare class Subscription {
    id: string;
    tenant_id: string;
    plan_id: string;
    status: string;
    payment_gateway_subscription_id: string;
    created_at: Date;
    tenant: Tenant;
}
