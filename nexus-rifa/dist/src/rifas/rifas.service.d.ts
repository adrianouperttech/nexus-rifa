import { Repository } from 'typeorm';
import { Rifa } from './rifa.entity';
export declare class RifasService {
    private rifasRepository;
    constructor(rifasRepository: Repository<Rifa>);
    findAll(): Promise<Rifa[]>;
    findOne(id: number): Promise<Rifa>;
    create(rifa: Rifa): Promise<Rifa>;
    update(id: number, rifa: Rifa): Promise<Rifa>;
    remove(id: number): Promise<void>;
}
