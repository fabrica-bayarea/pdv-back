import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class NotaFiscalService {
  prisma: any;

  constructor() {
    this.prisma = prisma;
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
    if (data && data.dataEmissao) {
      data.dataEmissao = new Date(data.dataEmissao);
    }
  
    return this.prisma.notaFiscal.create({
      data,
    });
  }
  

  async updateNotaFiscal(id: number, data: any) {
    if (id === undefined || typeof id !== 'number') {
      throw new Error('ID inválido!');
    }
    if (!data.dataEmissao || isNaN(new Date(data.dataEmissao).getTime())) {
      throw new Error('Data de emissão inválida!');
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