import { Repository } from 'typeorm';
import { Rifa } from './entities/rifa.entity';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { BillingService } from '../billing/billing.service';
export declare class RifasService {
    private readonly rifasRepository;
    private readonly billingService;
    constructor(rifasRepository: Repository<Rifa>, billingService: BillingService);
    create(tenant_id: string, createRifaDto: CreateRifaDto): Promise<Rifa>;
    findAll(tenant_id: string): Promise<Rifa[]>;
    findOne(tenant_id: string, id: string): Promise<Rifa>;
    update(tenant_id: string, id: string, updateRifaDto: UpdateRifaDto): Promise<Rifa>;
    remove(tenant_id: string, id: string): Promise<void>;
}
