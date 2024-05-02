import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Carrinho } from '.prisma/client';
import { CreateCarrinhoDTO } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDTO } from './dto/update-carrinho.dto';
import { Cliente } from '@prisma/client';

@Injectable()
export class CarrinhoService {
 
  findAllByCliente(cliente: Cliente): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

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

  async create(createCarrinhoDto: CreateCarrinhoDTO): Promise<Carrinho> {

    const clienteExists = await this.prisma.cliente.findUnique({
      where: { id: createCarrinhoDto.clienteId },
    });
    if (!clienteExists) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return await this.prisma.carrinho.create({
      data: {
        clienteId: createCarrinhoDto.clienteId,
        usuarioId: createCarrinhoDto.usuarioId,
        subtotal: createCarrinhoDto.subtotal,
      },
    });
  }

  async update(id: number, updateCarrinhoDto: UpdateCarrinhoDTO): Promise<Carrinho> {
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
    const carrinho = await this.findById(id);
    await this.prisma.carrinho.delete({ where: { id } });
  }
}
