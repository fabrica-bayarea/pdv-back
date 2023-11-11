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
  nome_fantasia: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 18) // Define um limite exato de 14 caracteres para o CNPJ
  cnpj: string;

  @IsNotEmpty()
  @Length(1, 20) // Define um limite mínimo de 1 caractere e máximo de 100 caracteres
  tipo_pessoa: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50) // Define um limite mínimo de 1 caractere e máximo de 20 caracteres para o telefone
  razao_social: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30) // Define um limite mínimo de 1 caractere e máximo de 200 caracteres para o endereço
  inscricao_estadual: string;

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
  data_registro: string;
}
