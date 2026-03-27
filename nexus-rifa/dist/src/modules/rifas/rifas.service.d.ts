import { Repository } from 'typeorm';
import { Rifa } from './entities/rifa.entity';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { AssinaturasService } from '../assinaturas/assinaturas.service';
import { PlansService } from '../plans/plans.service';
export declare class RifasService {
    private readonly rifasRepository;
    private readonly assinaturasService;
    private readonly plansService;
    constructor(rifasRepository: Repository<Rifa>, assinaturasService: AssinaturasService, plansService: PlansService);
    create(tenant_id: string, createRifaDto: CreateRifaDto): Promise<Rifa>;
    findAll(tenant_id: string): Promise<Rifa[]>;
    findOne(tenant_id: string, id: string): Promise<Rifa>;
    update(tenant_id: string, id: string, updateRifaDto: UpdateRifaDto): Promise<Rifa>;
    remove(tenant_id: string, id: string): Promise<void>;
}
