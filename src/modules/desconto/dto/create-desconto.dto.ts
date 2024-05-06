import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDescontoDto {
  @IsNotEmpty()
  carrinhoId: number;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  motivo: string;
}

