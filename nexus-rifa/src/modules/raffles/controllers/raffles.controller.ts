import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RafflesService } from './services/raffles.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('raffles')
export class RafflesController {
  constructor(private readonly rafflesService: RafflesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.rafflesService.create(createRaffleDto);
  }

  @Get()
  findAll() {
    return this.rafflesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rafflesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/draw')
  draw(@Param('id') id: string) {
    return this.rafflesService.draw(+id);
  }
}
