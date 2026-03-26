import { PartialType } from '@nestjs/mapped-types';
import { CreateRifaDto } from './create-rifa.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateRifaDto extends PartialType(CreateRifaDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit?: number;
}
