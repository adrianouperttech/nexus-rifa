import { Repository } from 'typeorm';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { Raffle } from './entities/raffle.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
export declare class RafflesService {
    private readonly raffleRepository;
    constructor(raffleRepository: Repository<Raffle>);
    create(createRaffleDto: CreateRaffleDto): Promise<Raffle>;
    findAll(): Promise<Raffle[]>;
    findOne(id: number): Promise<Raffle>;
    draw(id: number): Promise<Ticket>;
}
