import { IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProdutoSolicitacaoDto {
  @IsInt()
  solicitacaoCompraId: number;

  @IsString()
  @MinLength(7)
  @MaxLength(30)
  codigo_produto: string;

  @IsInt()
  quantidade: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  controle?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  descricao?: string;
}
