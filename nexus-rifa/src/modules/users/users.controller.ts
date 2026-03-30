import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users') // Rota padronizada e segura
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Req() req, @Body() createUserDto: CreateUserDto) {
    const tenant_id = req.user.tenant_id; // Extraído do token JWT
    return this.usersService.create(tenant_id, createUserDto);
  }

  @Get()
  findAll(@Req() req) {
    const tenant_id = req.user.tenant_id; // Extraído do token JWT
    return this.usersService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const tenant_id = req.user.tenant_id; // Extraído do token JWT
    return this.usersService.findOne(tenant_id, id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const tenant_id = req.user.tenant_id; // Extraído do token JWT
    return this.usersService.update(tenant_id, id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req, @Param('id') id: string) {
    const tenant_id = req.user.tenant_id; // Extraído do token JWT
    return this.usersService.remove(tenant_id, id);
  }
}
