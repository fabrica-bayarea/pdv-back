import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotaFiscalDTO {
  @IsNotEmpty()
  fornecedorId: number;

  @IsNotEmpty()
  @IsString()
  dataEntrada: string;

  @IsNotEmpty()
  @IsString()
  dataEmissao: string;
}
