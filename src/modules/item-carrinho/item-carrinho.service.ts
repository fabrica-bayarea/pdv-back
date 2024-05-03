import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemCarrinhoDto } from './dto/create-item-carrinho.dto';
import { UpdateItemCarrinhoDto } from './dto/update-item-carrinho.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemCarrinhoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemCarrinhoDto: CreateItemCarrinhoDto) {
    const newItemCarrinho = await this.prisma.itemCarrinho.create({
      data: createItemCarrinhoDto,
    });
    return newItemCarrinho;
  }

  async findAll() {
    const allItemCarrinho = await this.prisma.itemCarrinho.findMany();
    return allItemCarrinho;
  }

  async findOne(id: number) {
    const itemCarrinho = await this.prisma.itemCarrinho.findUnique({
      where: { id },
    });
    if (!itemCarrinho) {
      throw new NotFoundException(`ItemCarrinho with ID ${id} not found.`);
    }
    return itemCarrinho;
  }

  async update(id: number, updateItemCarrinhoDto: UpdateItemCarrinhoDto) {
    const updatedItemCarrinho = await this.prisma.itemCarrinho.update({
      where: { id },
      data: updateItemCarrinhoDto,
    });
    return updatedItemCarrinho;
  }

  async remove(id: number) {
    const deletedItemCarrinho = await this.prisma.itemCarrinho.delete({
      where: { id },
    });
    return deletedItemCarrinho;
  }
}
