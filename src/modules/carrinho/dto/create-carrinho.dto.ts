import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCarrinhoDTO {
  @IsNotEmpty()
  clienteId: number;

  @IsOptional()
  usuarioId?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  constructor(partial: Partial<CreateCarrinhoDTO>) {
    Object.assign(this, partial);
  }
}
