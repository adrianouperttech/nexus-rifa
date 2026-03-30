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
import { RifasService } from './rifas.service';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('rifas') // Rota simplificada e segura
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}

  @Post()
  create(@Req() req, @Body() createRifaDto: CreateRifaDto) {
    const tenant_id = req.user.tenant_id; // Extraído do token
    return this.rifasService.create(tenant_id, createRifaDto);
  }

  @Get()
  findAll(@Req() req) {
    const tenant_id = req.user.tenant_id; // Extraído do token
    return this.rifasService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const tenant_id = req.user.tenant_id; // Extraído do token
    return this.rifasService.findOne(tenant_id, id);
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateRifaDto: UpdateRifaDto,
  ) {
    const tenant_id = req.user.tenant_id; // Extraído do token
    return this.rifasService.update(tenant_id, id, updateRifaDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const tenant_id = req.user.tenant_id; // Extraído do token
    return this.rifasService.remove(tenant_id, id);
  }
}
