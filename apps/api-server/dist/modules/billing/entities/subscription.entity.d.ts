import { Tenant } from '../../tenants/entities/tenant.entity';
export declare class Subscription {
    id: string;
    tenant_id: string;
    status: string;
    tenant: Tenant;
}
