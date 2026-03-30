import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto, @Req() req) {
    const tenant_id = req.user.tenant_id;
    return this.reservasService.create(createReservaDto, tenant_id);
  }

  @Get()
  findAll(@Req() req) {
    const tenant_id = req.user.tenant_id;
    return this.reservasService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const tenant_id = req.user.tenant_id;
    return this.reservasService.findOne(tenant_id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservaDto: UpdateReservaDto,
    @Req() req,
  ) {
    const tenant_id = req.user.tenant_id;
    return this.reservasService.update(tenant_id, id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const tenant_id = req.user.tenant_id;
    return this.reservasService.remove(tenant_id, id);
  }
}
