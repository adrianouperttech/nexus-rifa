import {
  IsString,
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdatePlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  limit?: number;
}
