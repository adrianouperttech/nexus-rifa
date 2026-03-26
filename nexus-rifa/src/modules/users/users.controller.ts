import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('tenants/:tenant_id/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Param('tenant_id') tenant_id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(tenant_id, createUserDto);
  }

  @Get()
  findAll(@Param('tenant_id') tenant_id: string) {
    return this.usersService.findAll(tenant_id);
  }

  @Get(':id')
  findOne(@Param('tenant_id') tenant_id: string, @Param('id') id: string) {
    return this.usersService.findOne(tenant_id, id);
  }

  @Get('email/:email')
  findByEmail(
    @Param('tenant_id') tenant_id: string,
    @Param('email') email: string,
  ) {
    return this.usersService.findByEmail(tenant_id, email);
  }

  @Patch(':id')
  update(
    @Param('tenant_id') tenant_id: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(tenant_id, id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tenant_id') tenant_id: string, @Param('id') id: string) {
    return this.usersService.remove(tenant_id, id);
  }
}
