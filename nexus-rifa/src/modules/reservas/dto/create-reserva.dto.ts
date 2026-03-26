import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReservaDto {
  @IsUUID()
  @IsNotEmpty()
  readonly rifa_id: string;

  @IsNumber()
  @IsPositive()
  readonly numero: number;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  @IsNotEmpty()
  readonly whatsapp: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
