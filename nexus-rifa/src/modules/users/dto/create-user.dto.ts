import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;
}
