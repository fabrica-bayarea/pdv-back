import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoDto } from './create-carrinho.dto';

export class UpdateCarrinhoDto extends PartialType(CreateCarrinhoDto) {}
