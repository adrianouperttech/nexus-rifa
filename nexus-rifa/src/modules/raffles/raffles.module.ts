import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RafflesService } from './services/raffles.service';
import { RafflesController } from './controllers/raffles.controller';
import { Raffle } from './entities/raffle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raffle])],
  providers: [RafflesService],
  controllers: [RafflesController],
})
export class RafflesModule {}
