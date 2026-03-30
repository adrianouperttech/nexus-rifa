import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePagamentoDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['pendente', 'pago', 'cancelado'])
  @IsOptional()
  status?: string;
}
