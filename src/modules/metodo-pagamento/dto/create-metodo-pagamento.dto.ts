import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetodoPagamentoDto {
  @IsNotEmpty()
  @IsString()
  tipo: string;
}
