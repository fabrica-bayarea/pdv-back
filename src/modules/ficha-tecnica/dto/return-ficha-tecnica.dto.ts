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
    return {
      dimensoes: this.dimensoes,
      peso: this.peso,
      material: this.material,
      outrasEspecificacoes: this.outrasEspecificacoes,
      caracteristicas: this.caracteristicas,
      funcionalidades: this.funcionalidades,
      instrucoesUso: this.instrucoesUso,
      manutencao: this.manutencao,
      certificacoes: this.certificacoes,
      dataElaboracao: this.dataElaboracao,
    };
  }
}