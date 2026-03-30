import { RifasService } from './rifas.service';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
export declare class RifasController {
    private readonly rifasService;
    constructor(rifasService: RifasService);
    create(tenant_id: string, createRifaDto: CreateRifaDto): Promise<import("./entities/rifa.entity").Rifa>;
    findAll(tenant_id: string): Promise<import("./entities/rifa.entity").Rifa[]>;
    findOne(tenant_id: string, id: string): Promise<import("./entities/rifa.entity").Rifa>;
    update(tenant_id: string, id: string, updateRifaDto: UpdateRifaDto): Promise<import("./entities/rifa.entity").Rifa>;
    remove(tenant_id: string, id: string): Promise<void>;
}
