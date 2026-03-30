import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreatePlanoAssinaturaDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsObject()
  @IsNotEmpty()
  auto_recurring: {
    frequency: number;
    frequency_type: string;
    transaction_amount: number;
    currency_id: string;
  };

  @IsString()
  @IsNotEmpty()
  back_url: string;
}
