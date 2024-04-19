import { Injectable } from '@nestjs/common';
import { CreateItemCarrinhoDto } from './dto/create-item-carrinho.dto';
import { UpdateItemCarrinhoDto } from './dto/update-item-carrinho.dto';

@Injectable()
export class ItemCarrinhoService {
  create(createItemCarrinhoDto: CreateItemCarrinhoDto) {
    return 'This action adds a new itemCarrinho';
  }

  findAll() {
    return `This action returns all itemCarrinho`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemCarrinho`;
  }

  update(id: number, updateItemCarrinhoDto: UpdateItemCarrinhoDto) {
    return `This action updates a #${id} itemCarrinho`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemCarrinho`;
  }
}
