import { IsString, IsNumber, IsInt, IsPositive } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  limit: number;
}
