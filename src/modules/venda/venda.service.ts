import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

@Injectable()
export class VendaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto) {
    const { clienteId, vendedorId } = createVendaDto;

    const clienteExists = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
    });
    if (!clienteExists) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const vendedorExists = await this.prisma.vendedor.findUnique({
      where: { id: vendedorId },
    });
    if (!vendedorExists) {
      throw new NotFoundException('Vendedor não encontrado');
    }

    return await this.prisma.venda.create({
      data: {
        clienteId,
        vendedorId,
      },
    });
  }

  async findAll() {
    return await this.prisma.venda.findMany();
  }

  async findOne(id: number) {
    const venda = await this.prisma.venda.findUnique({ where: { id } });
    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }
    return venda;
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    const venda = await this.findOne(id);

    const { clienteId, vendedorId } = updateVendaDto;

    const clienteExists = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
    });
    if (!clienteExists) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const vendedorExists = await this.prisma.vendedor.findUnique({
      where: { id: vendedorId },
    });
    if (!vendedorExists) {
      throw new NotFoundException('Vendedor não encontrado');
    }

    return await this.prisma.venda.update({
      where: { id },
      data: {
        clienteId,
        vendedorId,
      },
    });
  }

  async remove(id: number) {
    const venda = await this.findOne(id);
    return await this.prisma.venda.delete({ where: { id } });
  }
}
