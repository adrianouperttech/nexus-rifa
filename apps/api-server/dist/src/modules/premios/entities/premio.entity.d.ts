import { Rifa } from '../../rifas/entities/rifa.entity';
export declare class Premio {
    id: string;
    rifa_id: string;
    descricao: string;
    ordem: number;
    created_at: Date;
    rifa: Rifa;
}
