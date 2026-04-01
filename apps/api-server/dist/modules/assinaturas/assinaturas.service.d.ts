import { Repository } from 'typeorm';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { Assinatura } from './entities/assinatura.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
export declare class AssinaturasService {
    private readonly logger;
    private readonly assinaturaRepository;
    private readonly httpService;
    private readonly configService;
    private readonly mercadoPagoApiUrl;
    private readonly mercadoPagoAccessToken;
    constructor(logger: Logger, assinaturaRepository: Repository<Assinatura>, httpService: HttpService, configService: ConfigService);
    create(tenant_id: string, createAssinaturaDto: CreateAssinaturaDto): Promise<Assinatura>;
    handleWebhook(data: any): Promise<any>;
    findByTenantId(tenantId: string): Promise<Assinatura | null>;
}
