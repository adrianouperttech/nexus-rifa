import { Rifa } from '../../rifas/entities/rifa.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
export declare class Cota {
    id: number;
    rifa_id: string;
    tenant_id: string;
    status: string;
    nome: string;
    whatsapp: string;
    email: string;
    reservado_em: Date;
    pago_em: Date;
    rifa: Rifa;
    tenant: Tenant;
}
