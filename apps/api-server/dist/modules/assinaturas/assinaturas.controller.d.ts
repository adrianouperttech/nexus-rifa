import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
export declare class AssinaturasController {
    private readonly assinaturasService;
    constructor(assinaturasService: AssinaturasService);
    create(tenant_id: string, createAssinaturaDto: CreateAssinaturaDto): Promise<import("./entities/assinatura.entity").Assinatura>;
    webhook(data: any): Promise<any>;
}
