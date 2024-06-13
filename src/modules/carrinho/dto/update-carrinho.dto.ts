import { IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoDTO } from './create-carrinho.dto';

export class UpdateCarrinhoDTO extends PartialType(CreateCarrinhoDTO) {
  @IsOptional()
  clienteId?: number;

  @IsOptional()
  usuarioId?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;
}
