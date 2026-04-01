import { Reserva } from '../../reservas/entities/reserva.entity';
export declare class Pagamento {
    id: string;
    reserva_id: string;
    reserva: Reserva;
    status: string;
    gateway_pagamento: string;
    transacao_id: string;
}
