import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { Raffle } from './entities/raffle.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class RafflesService {
  constructor(
    @InjectRepository(Raffle)
    private readonly raffleRepository: Repository<Raffle>,
  ) {}

  create(createRaffleDto: CreateRaffleDto): Promise<Raffle> {
    const raffle = new Raffle();
    raffle.name = createRaffleDto.name;
    raffle.prize = createRaffleDto.prize;
    return this.raffleRepository.save(raffle);
  }

  findAll(): Promise<Raffle[]> {
    return this.raffleRepository.find();
  }

  findOne(id: number): Promise<Raffle> {
    return this.raffleRepository.findOneBy({ id });
  }

  async draw(id: number): Promise<Ticket> {
    const raffle = await this.raffleRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
    if (!raffle || raffle.tickets.length === 0) {
      throw new Error('No tickets to draw from');
    }
    const winnerIndex = Math.floor(Math.random() * raffle.tickets.length);
    const winner = raffle.tickets[winnerIndex];
    raffle.winner = winner;
    await this.raffleRepository.save(raffle);
    return winner;
  }
}
