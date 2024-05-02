import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateNotaFiscalEntradaDTO {
  @IsNotEmpty()
  @IsString()
  numeroNota: string;

  @IsNotEmpty()
  dataEmissao: Date;

  @IsOptional()
  @IsString()
  serie?: string;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsOptional()
  @IsNumber()
  valorImpostos?: number;

  @IsOptional()
  @IsString()
  condicoesPagamento?: string;

  @IsOptional()
  @IsString()
  prazoEntrega?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsNotEmpty()
  emitenteId: number;

  @IsNotEmpty()
  destinatarioId: number;
}
