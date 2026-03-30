import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
export declare class PagamentosController {
    private readonly pagamentosService;
    constructor(pagamentosService: PagamentosService);
    create(tenant_id: string, createPagamentoDto: CreatePagamentoDto): Promise<any>;
    handleWebhook(notification: any): Promise<void>;
}
