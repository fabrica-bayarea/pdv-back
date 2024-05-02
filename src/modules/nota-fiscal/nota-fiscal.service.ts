import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotaFiscalDTO } from './dto/create-nota-fiscal.dto';
import { NotaFiscal } from '@prisma/client';

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

  async createNotaFiscal(data: CreateNotaFiscalDTO) {
    if (!data || typeof data !== 'object') {
      throw new NotFoundException('Dados inválidos para criação de nota fiscal.');
    }

    const notaFiscal: NotaFiscal = {
      tipoDeNota: '',
      modelo: '',
      id_fornecedor: data.fornecedorId,
      numeroDaNota: '',
      id: undefined,
      dataEntrada: undefined,
      dataEmissao: undefined
    };

    if (data.dataEntrada) {
      var partesTexto = data.dataEntrada.split('/');
      notaFiscal.dataEntrada = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`);
      // .toISOString();
    }

    if (data.dataEmissao) {
      var partesTexto = data.dataEmissao.split('/');
      notaFiscal.dataEmissao = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`);
      // .toISOString();
    }

    return this.prisma.notaFiscal.create({
      data: notaFiscal,
    });
  }

  async updateNotaFiscal(id: number, data: CreateNotaFiscalDTO) {
      if (!id || typeof id !== 'number') {
      throw new NotFoundException('ID inválido!');
    }

    const existingNotaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { id },
    });

    if (!existingNotaFiscal) {
      throw new NotFoundException('Nota fiscal não encontrada.');
    }

    // data.id = id;
    // data.dataEmissao = existingNotaFiscal.dataEmissao;
    // data.dataEntrada = existingNotaFiscal.dataEntrada;

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
