import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty()
  @IsString()
  rua: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  clienteId: number;
}
