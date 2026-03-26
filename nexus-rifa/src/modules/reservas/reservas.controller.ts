import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(
    @Body() createReservaDto: CreateReservaDto,
    @Headers('tenant_id') tenant_id: string,
  ) {
    return this.reservasService.create(createReservaDto, tenant_id);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservasService.remove(id);
  }
}
