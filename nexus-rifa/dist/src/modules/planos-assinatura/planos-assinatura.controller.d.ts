import { PlanosAssinaturaService } from './planos-assinatura.service';
import { CreatePlanoAssinaturaDto } from './dto/create-plano-assinatura.dto';
export declare class PlanosAssinaturaController {
    private readonly planosAssinaturaService;
    constructor(planosAssinaturaService: PlanosAssinaturaService);
    create(createPlanoAssinaturaDto: CreatePlanoAssinaturaDto): Promise<import("./entities/plano-assinatura.entity").PlanoAssinatura>;
}
