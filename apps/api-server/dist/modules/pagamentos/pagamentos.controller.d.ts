import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { WebhookValidationService } from '../../common/security/webhook-validation.service';
import { Logger } from 'winston';
export declare class PagamentosController {
    private readonly logger;
    private readonly pagamentosService;
    private readonly webhookValidationService;
    constructor(logger: Logger, pagamentosService: PagamentosService, webhookValidationService: WebhookValidationService);
    create(req: any, createPagamentoDto: CreatePagamentoDto): Promise<any>;
    handleWebhook(signature: string, notification: any): Promise<void>;
}
