import { Tenant } from '../../tenants/entities/tenant.entity';
import { Cota } from '../../cotas/entities/cota.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Premio } from '../../premios/entities/premio.entity';
export declare class Rifa {
    id: string;
    tenant_id: string;
    titulo: string;
    descricao: string;
    valor_cota: number;
    min_num: number;
    max_num: number;
    chave_pix: string;
    status: string;
    created_at: Date;
    limite: number;
    nome: string;
    tenant: Tenant;
    cotas: Cota[];
    reservas: Reserva[];
    premios: Premio[];
}
