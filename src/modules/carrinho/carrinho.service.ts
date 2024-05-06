import { Injectable, NotFoundException } from '@nestjs/common';
import { Carrinho } from '@prisma/client';
import { CreateCarrinhoDTO } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDTO } from './dto/update-carrinho.dto';


@Injectable()
export class CarrinhoService {
  update(id: number, updateCarrinhoDto: UpdateCarrinhoDTO): any {
    throw new Error('Method not implemented.');
  }
  prisma: any;

  async create(createCarrinhoDto: CreateCarrinhoDTO): Promise<Carrinho> {
    return await this.prisma.carrinho.create({ 
      data: {
        clienteId: createCarrinhoDto.clienteId,
      } 
    });
  }

  async findAllByCliente(clienteId: number): Promise<Carrinho[]> {
    return await this.prisma.carrinho.findMany({ where: { clienteId } });
  }

  async findAll(): Promise<Carrinho[]> {
    return await this.prisma.carrinho.findMany();
  }

  async findById(id: number): Promise<Carrinho> {
    const carrinho = await this.prisma.carrinho.findUnique({ where: { id } });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    return carrinho;
  }
  
  async updateCarrinho(id: number, updateCarrinhoDto: UpdateCarrinhoDTO): Promise<Carrinho> {
    const carrinho = await this.findById(id);

    return await this.prisma.carrinho.update({
      where: { id },
      data: {
        clienteId: updateCarrinhoDto.clienteId,
        usuarioId: updateCarrinhoDto.usuarioId,
        subtotal: updateCarrinhoDto.subtotal,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.carrinho.delete({ where: { id } });
  }
}
