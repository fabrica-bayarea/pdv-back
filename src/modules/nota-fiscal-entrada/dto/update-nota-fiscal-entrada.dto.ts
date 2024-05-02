import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNotaFiscalEntradaDTO {
  @IsOptional()
  @IsString()
  numeroNota?: string;

  @IsOptional()
  dataEmissao?: Date;

  @IsOptional()
  @IsString()
  serie?: string;

  @IsOptional()
  @IsNumber()
  valorTotal?: number;

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

  @IsOptional()
  emitenteId?: number;

  @IsOptional()
  destinatarioId?: number;

  toObject() {
    const updateObject: Record<string, any> = {};
    
    if (this.numeroNota !== undefined) updateObject.numeroNota = this.numeroNota;
    if (this.dataEmissao !== undefined) updateObject.dataEmissao = this.dataEmissao;
    if (this.serie !== undefined) updateObject.serie = this.serie;
    if (this.valorTotal !== undefined) updateObject.valorTotal = this.valorTotal;
    if (this.valorImpostos !== undefined) updateObject.valorImpostos = this.valorImpostos;
    if (this.condicoesPagamento !== undefined) updateObject.condicoesPagamento = this.condicoesPagamento;
    if (this.prazoEntrega !== undefined) updateObject.prazoEntrega = this.prazoEntrega;
    if (this.observacoes !== undefined) updateObject.observacoes = this.observacoes;
    if (this.emitenteId !== undefined) updateObject.emitenteId = this.emitenteId;
    if (this.destinatarioId !== undefined) updateObject.destinatarioId = this.destinatarioId;
    
    return updateObject;
  }
}
