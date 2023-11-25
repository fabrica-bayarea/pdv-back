import { Injectable } from '@nestjs/common';
import { PrismaClient, Vendedor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendedorService {
  constructor( private prisma: PrismaService) {}

  async findAll(): Promise<Vendedor[]> {
    return this.prisma.vendedor.findMany();
  }

  async findOne(id: number): Promise<Vendedor | null> {
    return this.prisma.vendedor.findUnique({
      where: { id },
    });
  }

  async create(data) {
    if (data.dataNascimento) {
      var partesTexto = data.dataNascimento.split('/');
      data.dataNascimento = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
    }
    return this.prisma.vendedor.create({
      data,
    });
  }

  async update(id: number, data: Vendedor): Promise<Vendedor | null> {
    return this.prisma.vendedor.update({
      where: { id },
      data,
    });
  }

  async deleteVendedor(id: number): Promise<void> {
    this.prisma.vendedor.delete({
      where: { id },
    });
  }
}
