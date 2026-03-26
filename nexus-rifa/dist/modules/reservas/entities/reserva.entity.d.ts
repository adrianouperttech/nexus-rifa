import { Tenant } from '../../tenants/entities/tenant.entity';
import { Rifa } from '../../rifas/entities/rifa.entity';
export declare class Reserva {
    id: string;
    tenant_id: string;
    rifa_id: string;
    numero: number;
    nome: string;
    whatsapp: string;
    email: string;
    status: string;
    created_at: Date;
    tenant: Tenant;
    rifa: Rifa;
}
