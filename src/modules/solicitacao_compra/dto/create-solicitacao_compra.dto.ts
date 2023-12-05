import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSolicitacaoCompraDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  vendedorId: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  observacao?: string;
}
