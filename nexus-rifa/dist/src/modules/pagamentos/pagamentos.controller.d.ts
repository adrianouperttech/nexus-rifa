import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { TenantInfo } from '../tenants/decorators/tenant-info.decorator';
interface WebhookPayload {
    transacao_id: string;
    status: 'pago' | 'cancelado';
}
export declare class PagamentosController {
    private readonly pagamentosService;
    private readonly webhookValidationService;
    constructor(pagamentosService: PagamentosService, webhookValidationService: WebhookValidationService);
    create(tenantInfo: TenantInfo, createPagamentoDto: CreatePagamentoDto): Promise<any>;
    handleWebhook(req: Request, payload: WebhookPayload): Promise<void>;
}
export {};
