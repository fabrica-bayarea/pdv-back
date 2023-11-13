import { Injectable } from '@nestjs/common';
import { Prisma, NotaFiscalEntrada, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotaFiscalEntradaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NotaFiscalEntradaCreateInput): Promise<NotaFiscalEntrada> {
    return this.prisma.notaFiscalEntrada.create({ data });
  }

  async findAll(): Promise<NotaFiscalEntrada[]> {
    return this.prisma.notaFiscalEntrada.findMany();
  }

  async findOne(id: number): Promise<NotaFiscalEntrada | null> {
    return this.prisma.notaFiscalEntrada.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.NotaFiscalEntradaUpdateInput): Promise<NotaFiscalEntrada> {
    return this.prisma.notaFiscalEntrada.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<NotaFiscalEntrada> {
    return this.prisma.notaFiscalEntrada.delete({
      where: { id },
    });
  }
}
