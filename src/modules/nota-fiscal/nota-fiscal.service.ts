import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotaFiscalService {

  constructor(private prisma: PrismaService) {
  }

  async findAllNotasFiscais() {
    return this.prisma.notaFiscal.findMany();
  }

  async findNotaFiscalById(id: number) {
    if (id === undefined || typeof id !== 'number') {
      throw new Error('ID inválido!');
    }

    return this.prisma.notaFiscal.findUnique({
      where: { id },
    });
  }

  async createNotaFiscal(data: any) {

    return this.prisma.notaFiscal.create({
      data,
    });
  }
  

  async updateNotaFiscal(id: number, data: any) {
    if (id === undefined || typeof id !== 'number') {
      throw new Error('ID inválido!');
    }
    if (data.dataEmissao) {
      throw new Error('Data de emissão não pode ser atualizada!');
    }

    return this.prisma.notaFiscal.update({
      where: { id },
      data,
    });
  }

  async deleteNotaFiscal(id: number) {
    if (id === undefined || typeof id !== 'number') {
      throw new Error('ID inválido!');
    }
    const existingNotaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { id },
    });

    if (!existingNotaFiscal) {
      throw new Error('Nota fiscal não encontrada.');
    }

    return this.prisma.notaFiscal.delete({
      where: { id },
    });
  }
}