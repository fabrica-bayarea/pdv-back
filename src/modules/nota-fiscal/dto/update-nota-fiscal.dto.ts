import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNotaFiscalDTO {
  @IsOptional()
  @IsString()
  tipoDeNota?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  id_fornecedor?: number;

  @IsOptional()
  @IsString()
  numeroDaNota?: string;

  toObject() {
    const updateObject: Record<string, any> = {};
    
    if (this.tipoDeNota !== undefined) updateObject.tipoDeNota = this.tipoDeNota;
    if (this.modelo !== undefined) updateObject.modelo = this.modelo;
    if (this.id_fornecedor !== undefined) updateObject.id_fornecedor = this.id_fornecedor;
    if (this.numeroDaNota !== undefined) updateObject.numeroDaNota = this.numeroDaNota;
    
    return updateObject;
  }
}
