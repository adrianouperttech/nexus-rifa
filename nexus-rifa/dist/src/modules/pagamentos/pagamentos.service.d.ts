import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { ReservasService } from '../reservas/reservas.service';
export declare class PagamentosService {
    private readonly pagamentoRepository;
    private readonly reservasService;
    private readonly mercadopago;
    constructor(pagamentoRepository: Repository<Pagamento>, reservasService: ReservasService);
    create(tenant_id: string, createPagamentoDto: CreatePagamentoDto): Promise<any>;
    handlePagamentoWebhook(notification: any): Promise<void>;
}
