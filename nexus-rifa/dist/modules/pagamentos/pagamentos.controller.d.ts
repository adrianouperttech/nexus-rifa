import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
interface WebhookPayload {
    transacao_id: string;
    status: 'pago' | 'cancelado';
}
export declare class PagamentosController {
    private readonly pagamentosService;
    private readonly webhookValidationService;
    constructor(pagamentosService: PagamentosService, webhookValidationService: WebhookValidationService);
    create(createPagamentoDto: CreatePagamentoDto): Promise<any>;
    handleWebhook(req: Request, payload: WebhookPayload): Promise<void>;
}
export {};
