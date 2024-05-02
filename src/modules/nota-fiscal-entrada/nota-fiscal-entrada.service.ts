import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, NotaFiscalEntrada } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotaFiscalEntradaDTO } from './dto/create-nota-fiscal-entrada.dto';

@Injectable()
export class NotaFiscalEntradaService {
  findOne(id: number): Promise<{ id: number; numeroNota: string; dataEmissao: Date; serie: string; valorTotal: number; valorImpostos: number; condicoesPagamento: string; prazoEntrega: string; observacoes: string; emitenteId: number; destinatarioId: number; }> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<{ id: number; numeroNota: string; dataEmissao: Date; serie: string; valorTotal: number; valorImpostos: number; condicoesPagamento: string; prazoEntrega: string; observacoes: string; emitenteId: number; destinatarioId: number; }[]> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNotaFiscalEntradaDTO): Promise<NotaFiscalEntrada> {
    const mappedData: Prisma.NotaFiscalEntradaCreateInput = {
      numeroNota: data.numeroNota, 
      dataEmissao: data.dataEmissao,
      serie: data.serie,
      valorTotal: data.valorTotal,
      valorImpostos: data.valorImpostos,
      condicoesPagamento: data.condicoesPagamento,
      prazoEntrega: data.prazoEntrega,
      observacoes: data.observacoes,
      emitente: { connect: { id: data.emitenteId } },
      destinatario: { connect: { id: data.destinatarioId } },
    };
    return this.prisma.notaFiscalEntrada.create({ data: mappedData });
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
