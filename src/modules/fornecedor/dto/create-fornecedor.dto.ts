import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Validate,
} from 'class-validator';
import { isValid, parseISO } from 'date-fns';

export class CreateFornecedorDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60) // Define um limite mínimo de 1 caractere e máximo de 100 caracteres
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 18) // Define um limite exato de 14 caracteres para o CNPJ
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 40) // Define um limite mínimo de 1 caractere e máximo de 100 caracteres
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30) // Define um limite mínimo de 1 caractere e máximo de 20 caracteres para o telefone
  telefone: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100) // Define um limite mínimo de 1 caractere e máximo de 200 caracteres para o endereço
  endereco: string;

  @Validate((value: string) => {
    // Verifique se a data está no formato "DD/MM/YYYY"
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return false;
    }

    // Converta a data para o formato ISO (YYYY-MM-DD) que o `date-fns` aceita
    const isoDate = value.split('/').reverse().join('-');

    // Verifique se a data é válida usando o `date-fns`
    return isValid(parseISO(isoDate));
  })
  data_nascimento: string;
}
