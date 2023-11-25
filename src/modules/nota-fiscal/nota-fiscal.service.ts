import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotaFiscalService {

  constructor(private prisma: PrismaService) {}

  async findAllNotasFiscais() {
    return this.prisma.notaFiscal.findMany();
  }

  async findNotaFiscalById(id: number) {
    if (!id || typeof id !== 'number') {
      throw new NotFoundException('ID inválido!');
    }

    const notaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { id },
    });

    if (!notaFiscal) {
      throw new NotFoundException('Nota fiscal não encontrada.');
    }

    return notaFiscal;
  }

  async createNotaFiscal(data: any) {
    if (data.fornecedorId) {
      data.fornecedorId = Number(data.fornecedorId);
    }
    if (data.dataEntrada) {
      var partesTexto = data.dataEntrada.split('/');
      data.dataEntrada = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
    }
    if (data.dataEmissao) {
      var partesTexto = data.dataEmissao.split('/');
      data.dataEmissao = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
    }

    return this.prisma.notaFiscal.create({
      data,
    });
  }

  async updateNotaFiscal(id: number, data: any) {
    if (!id || typeof id !== 'number') {
      throw new NotFoundException('ID inválido!');
    }

    const existingNotaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { id },
    });

    if (!existingNotaFiscal) {
      throw new NotFoundException('Nota fiscal não encontrada.');
    }

    data.id = id;
    data.dataEmissao = existingNotaFiscal.dataEmissao;
    data.dataEntrada = existingNotaFiscal.dataEntrada;
    // if (data.dataEmissao) {
    //   throw new Error('Data de emissão não pode ser atualizada!');
    // }

    return this.prisma.notaFiscal.update({
      where: { id },
      data,
    });
  }

  async deleteNotaFiscal(id: number) {
    if (!id || typeof id !== 'number') {
      throw new NotFoundException('ID inválido!');
    }

    const existingNotaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { id },
    });

    if (!existingNotaFiscal) {
      throw new NotFoundException('Nota fiscal não encontrada.');
    }

    return this.prisma.notaFiscal.delete({
      where: { id },
    });
  }
}
