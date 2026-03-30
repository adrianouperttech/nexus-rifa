import { Repository } from 'typeorm';
import { CreatePlanoAssinaturaDto } from './dto/create-plano-assinatura.dto';
import { PlanoAssinatura } from './entities/plano-assinatura.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class PlanosAssinaturaService {
    private readonly planoAssinaturaRepository;
    private readonly httpService;
    private readonly configService;
    private readonly mercadoPagoApiUrl;
    private readonly mercadoPagoAccessToken;
    constructor(planoAssinaturaRepository: Repository<PlanoAssinatura>, httpService: HttpService, configService: ConfigService);
    create(createPlanoAssinaturaDto: CreatePlanoAssinaturaDto): Promise<PlanoAssinatura>;
}
