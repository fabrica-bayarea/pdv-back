import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContagemMensalService {

  constructor(private readonly prisma: PrismaService) {
  }


  async findAllContagemMensal() {
    return this.prisma.contagemMensal.findMany();
  }

  async findContagemMensalById(id: number) {
    return this.prisma.contagemMensal.findUnique({
      where: { id },
    });
  }

  async createContagemMensal(data: any) {
    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento).toISOString();
    }

    return this.prisma.contagemMensal.create({
      data,
    });
  }

  async updateContagemMensal(id: number, data: any) {
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
