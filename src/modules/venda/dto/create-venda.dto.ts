import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVendaDto {
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsNumber()
  vendedorId: number;
}

