import { IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoDTO } from './create-carrinho.dto';

export class UpdateCarrinhoDto extends PartialType(CreateCarrinhoDTO) {}



export class UpdateCarrinhoDTO {
  @IsOptional()
  clienteId?: number;

  @IsOptional()
  usuarioId?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;
}
