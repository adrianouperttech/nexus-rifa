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
import { TenantId } from '../../common/decorators/tenant-id.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('rifas')
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}

  @Post()
  create(@TenantId() tenantId: string, @Body() createRifaDto: CreateRifaDto) {
    return this.rifasService.create(tenantId, createRifaDto);
  }

  @Get()
  findAll(@TenantId() tenantId: string) {
    return this.rifasService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.rifasService.findOne(tenantId, id);
  }

  @Put(':id')
  update(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() updateRifaDto: UpdateRifaDto,
  ) {
    return this.rifasService.update(tenantId, id, updateRifaDto);
  }

  @Delete(':id')
  remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.rifasService.remove(tenantId, id);
  }
}
