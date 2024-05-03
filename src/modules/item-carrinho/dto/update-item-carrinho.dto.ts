import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCarrinhoDto } from './create-item-carrinho.dto';

export class UpdateItemCarrinhoDto extends PartialType(CreateItemCarrinhoDto) {
    quantidade: number;
}
