import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantDto } from './create-tenant.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
