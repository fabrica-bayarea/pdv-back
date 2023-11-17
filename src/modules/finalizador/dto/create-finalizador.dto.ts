import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateFinalizadorDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  codigo: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  situacao: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  grupoReceita: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  bandeira: string;
}

