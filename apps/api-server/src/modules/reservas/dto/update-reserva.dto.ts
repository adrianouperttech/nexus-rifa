import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly nome?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly whatsapp?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly status?: string;
}
