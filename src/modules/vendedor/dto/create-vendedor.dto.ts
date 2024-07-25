import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateVendedorDTO {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsNotEmpty()
  dataNascimento: Date;
  data_nascimento: any;
}
