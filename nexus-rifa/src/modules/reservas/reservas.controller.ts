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
  findAll(@Headers('tenant_id') tenant_id: string) {
    return this.reservasService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('tenant_id') tenant_id: string) {
    return this.reservasService.findOne(tenant_id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservaDto: UpdateReservaDto,
    @Headers('tenant_id') tenant_id: string,
  ) {
    return this.reservasService.update(tenant_id, id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('tenant_id') tenant_id: string) {
    return this.reservasService.remove(tenant_id, id);
  }
}
