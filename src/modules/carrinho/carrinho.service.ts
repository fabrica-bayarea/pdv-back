import { Injectable } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';

@Injectable()
export class CarrinhoService {
  create(createCarrinhoDto: CreateCarrinhoDto) {
    return 'This action adds a new carrinho';
  }

  findAll() {
    return `This action returns all carrinho`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrinho`;
  }

  update(id: number, updateCarrinhoDto: UpdateCarrinhoDto) {
    return `This action updates a #${id} carrinho`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrinho`;
  }
}
