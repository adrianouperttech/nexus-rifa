import { RifasService } from './rifas.service';
import { Rifa } from './rifa.entity';
export declare class RifasController {
    private readonly rifasService;
    constructor(rifasService: RifasService);
    findAll(): Promise<Rifa[]>;
    findOne(id: string): Promise<Rifa>;
    create(rifa: Rifa): Promise<Rifa>;
    update(id: string, rifa: Rifa): Promise<Rifa>;
    remove(id: string): Promise<void>;
}
