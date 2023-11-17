import { Injectable } from '@nestjs/common';
import { PrismaClient, Vendedor } from '@prisma/client';
import { formatISO, parse } from 'date-fns';
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

  async create(data: any): Promise<Vendedor> {
    if (data.dataNascimento) {
      const dataParseada = parse(data.dataNascimento, 'dd/MM/yyyy', new Date());
      data.dataNascimento = formatISO(dataParseada);
    }
    return this.prisma.vendedor.create({
      data,
    });
  }

  async update(id: number, data: any): Promise<Vendedor | null> {
    if (data.dataNascimento) {
      const dataParseada = parse(data.dataNascimento, 'dd/MM/yyyy', new Date());
      data.dataNascimento = formatISO(dataParseada);
    }
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
