import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ContagemMensalService {
  prisma: any;

  constructor() {
    this.prisma = prisma;
  }


  async findAllClientes() {
    return this.prisma.contagemMensal.findMany();
  }

  async findClienteById(id: number) {
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
