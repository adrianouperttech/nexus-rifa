import { User } from '../../users/entities/user.entity';
import { Rifa } from '../../rifas/entities/rifa.entity';
import { Cota } from '../../cotas/entities/cota.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';
import { Subscription } from '../../billing/entities/subscription.entity';
export declare class Tenant {
    id: string;
    nome: string;
    email: string;
    ativo: boolean;
    created_at: Date;
    users: User[];
    rifas: Rifa[];
    cotas: Cota[];
    reservas: Reserva[];
    pagamentos: Pagamento[];
    subscriptions: Subscription[];
}
