import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RifasService } from './rifas.service';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { AuthGuard } from '@nestjs/passport';
import { BillingGuard } from '../../common/guards/billing.guard';

@Controller('tenants/:tenant_id/rifas')
@UseGuards(BillingGuard)
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('tenant_id') tenant_id: string,
    @Body() createRifaDto: CreateRifaDto,
  ) {
    return this.rifasService.create(tenant_id, createRifaDto);
  }

  @Get()
  findAll(@Param('tenant_id') tenant_id: string) {
    return this.rifasService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Param('tenant_id') tenant_id: string, @Param('id') id: string) {
    return this.rifasService.findOne(tenant_id, id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('tenant_id') tenant_id: string,
    @Param('id') id: string,
    @Body() updateRifaDto: UpdateRifaDto,
  ) {
    return this.rifasService.update(tenant_id, id, updateRifaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('tenant_id') tenant_id: string, @Param('id') id: string) {
    return this.rifasService.remove(tenant_id, id);
  }
}
