import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { RifasService } from './rifas.service';
import { Rifa } from './rifa.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('rifas')
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}

  @Get()
  findAll(): Promise<Rifa[]> {
    return this.rifasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rifa> {
    return this.rifasService.findOne(+id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() rifa: Rifa): Promise<Rifa> {
    return this.rifasService.create(rifa);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() rifa: Rifa): Promise<Rifa> {
    return this.rifasService.update(+id, rifa);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.rifasService.remove(+id);
  }
}
