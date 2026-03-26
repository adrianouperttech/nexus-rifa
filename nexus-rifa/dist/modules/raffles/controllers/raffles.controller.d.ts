import { RafflesService } from './services/raffles.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';
export declare class RafflesController {
    private readonly rafflesService;
    constructor(rafflesService: RafflesService);
    create(createRaffleDto: CreateRaffleDto): any;
    findAll(): any;
    findOne(id: string): any;
    draw(id: string): any;
}
