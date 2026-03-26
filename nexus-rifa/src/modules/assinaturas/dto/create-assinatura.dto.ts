import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssinaturaDto {
  @IsString()
  @IsNotEmpty()
  plan_id: string;

  @IsEmail()
  @IsNotEmpty()
  payer_email: string;

  @IsString()
  @IsNotEmpty()
  card_token_id: string;
}
