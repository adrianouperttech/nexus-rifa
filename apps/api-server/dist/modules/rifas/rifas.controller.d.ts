import { RifasService } from './rifas.service';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
export declare class RifasController {
    private readonly rifasService;
    constructor(rifasService: RifasService);
    create(req: any, createRifaDto: CreateRifaDto): Promise<import("./entities/rifa.entity").Rifa>;
    findAll(req: any): Promise<import("./entities/rifa.entity").Rifa[]>;
    findOne(req: any, id: string): Promise<import("./entities/rifa.entity").Rifa>;
    update(req: any, id: string, updateRifaDto: UpdateRifaDto): Promise<import("./entities/rifa.entity").Rifa>;
    remove(req: any, id: string): Promise<void>;
}
