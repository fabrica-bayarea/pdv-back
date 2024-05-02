import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFichaTecnicaProdutoDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  dimensoes?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  peso?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  material?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  outrasEspecificacoes?: string;

  @IsString()
  @IsNotEmpty()
  caracteristicas: string;

  @IsString()
  @IsNotEmpty()
  funcionalidades: string;

  @IsString()
  @IsNotEmpty()
  instrucoesUso: string;

  @IsString()
  @IsNotEmpty()
  manutencao: string;

  @IsString()
  @IsNotEmpty()
  certificacoes: string;

  @IsNotEmpty()
  dataElaboracao: Date;

  constructor(data: {
    dimensoes?: string;
    peso?: string;
    material?: string;
    outrasEspecificacoes?: string;
    caracteristicas: string;
    funcionalidades: string;
    instrucoesUso: string;
    manutencao: string;
    certificacoes: string;
    dataElaboracao: Date;
  }) {
    this.dimensoes = data.dimensoes;
    this.peso = data.peso;
    this.material = data.material;
    this.outrasEspecificacoes = data.outrasEspecificacoes;
    this.caracteristicas = data.caracteristicas;
    this.funcionalidades = data.funcionalidades;
    this.instrucoesUso = data.instrucoesUso;
    this.manutencao = data.manutencao;
    this.certificacoes = data.certificacoes;
    this.dataElaboracao = data.dataElaboracao;
  }
}
