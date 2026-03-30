import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRifaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly limit: number;
}
