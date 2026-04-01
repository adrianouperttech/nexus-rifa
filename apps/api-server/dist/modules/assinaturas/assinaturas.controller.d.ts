import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { Logger } from 'winston';
export declare class AssinaturasController {
    private readonly logger;
    private readonly assinaturasService;
    constructor(logger: Logger, assinaturasService: AssinaturasService);
    create(tenant_id: string, createAssinaturaDto: CreateAssinaturaDto): Promise<import("./entities/assinatura.entity").Assinatura>;
    webhook(data: any): Promise<any>;
}
