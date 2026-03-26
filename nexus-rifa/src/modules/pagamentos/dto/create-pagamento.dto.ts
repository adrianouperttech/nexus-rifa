import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePagamentoDto {
  @IsUUID()
  @IsNotEmpty()
  reserva_id: string;
}
