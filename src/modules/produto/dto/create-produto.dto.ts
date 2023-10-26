import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  marca: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 191)
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  nome_categoria: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 18)
  cnpj_fornecedor: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  codigo_produto: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  unidade_medida: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsNumber()
  @IsPositive()
  estoque_atual: number;
}
