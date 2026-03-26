import { Tenant } from '../../tenants/entities/tenant.entity';
export declare class User {
    id: string;
    tenant_id: string;
    tenant: Tenant;
    nome: string;
    email: string;
    password: string;
    role: string;
    ativo: boolean;
    created_at: Date;
}
