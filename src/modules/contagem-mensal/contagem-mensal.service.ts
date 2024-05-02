import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContagemMensal, Prisma } from '@prisma/client';
import { CreateContagemMensalDTO } from './dto/create-contagem-mensal.dto';

@Injectable()
export class ContagemMensalService {
  remove(id: number): Promise<{ id: number; mes: number; ano: number; localizacao: string; responsavel: string; dataHoraContagem: Date; observacoes: string; }> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: Prisma.ContagemMensalUpdateInput): Promise<{ id: number; mes: number; ano: number; localizacao: string; responsavel: string; dataHoraContagem: Date; observacoes: string; }> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<{ id: number; mes: number; ano: number; localizacao: string; responsavel: string; dataHoraContagem: Date; observacoes: string; }> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<{ id: number; mes: number; ano: number; localizacao: string; responsavel: string; dataHoraContagem: Date; observacoes: string; }[]> {
    throw new Error('Method not implemented.');
  }
  create(data: Prisma.ContagemMensalCreateInput): Promise<{ id: number; mes: number; ano: number; localizacao: string; responsavel: string; dataHoraContagem: Date; observacoes: string; }> {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly prisma: PrismaService) {}

  async findAllContagemMensal() {
    return this.prisma.contagemMensal.findMany();
  }

  async findContagemMensalById(id: number) {
    return this.prisma.contagemMensal.findUnique({
      where: { id },
    });
  }

  async createContagemMensal(data: CreateContagemMensalDTO) {
    return this.prisma.contagemMensal.create({
      data: {
        mes: data.mes,
        ano: data.ano,
        localizacao: data.localizacao,
        responsavel: data.responsavel,
        dataHoraContagem: data.dataHoraContagem,
        observacoes: data.observacoes,
      },
    });
  }

  async updateContagemMensal(id: number, data: Partial<ContagemMensal>) {
    return this.prisma.contagemMensal.update({
      where: { id },
      data,
    });
  }

  async deleteContagemMensal(id: number) {
    return this.prisma.contagemMensal.delete({
      where: { id },
    });
  }
}
