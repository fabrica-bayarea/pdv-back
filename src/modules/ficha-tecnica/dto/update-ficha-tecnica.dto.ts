import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateFichaTecnicaProdutoDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(1, 255)
  dimensoes?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(1, 255)
  peso?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(1, 255)
  material?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(1, 255)
  outrasEspecificacoes?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  caracteristicas?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  funcionalidades?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  instrucoesUso?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  manutencao?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  certificacoes?: string;

  @IsNotEmpty()
  @IsOptional()
  dataElaboracao?: Date;

  toObject() {
    const updateObject: Record<string, any> = {};
    
    if (this.dimensoes !== undefined) updateObject.dimensoes = this.dimensoes;
    if (this.peso !== undefined) updateObject.peso = this.peso;
    if (this.material !== undefined) updateObject.material = this.material;
    if (this.outrasEspecificacoes !== undefined) updateObject.outrasEspecificacoes = this.outrasEspecificacoes;
    if (this.caracteristicas !== undefined) updateObject.caracteristicas = this.caracteristicas;
    if (this.funcionalidades !== undefined) updateObject.funcionalidades = this.funcionalidades;
    if (this.instrucoesUso !== undefined) updateObject.instrucoesUso = this.instrucoesUso;
    if (this.manutencao !== undefined) updateObject.manutencao = this.manutencao;
    if (this.certificacoes !== undefined) updateObject.certificacoes = this.certificacoes;
    if (this.dataElaboracao !== undefined) updateObject.dataElaboracao = this.dataElaboracao;
    
    return updateObject;
  }
}
