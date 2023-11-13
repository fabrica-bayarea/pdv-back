import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllClientes() {
    return this.prisma.cliente.findMany();
  }

  async findClienteById(id) {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async createCliente(data) {
    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento).toISOString();
    }
  
    return this.prisma.cliente.create({
      data,
    });
  }
  

  async updateCliente(id, data) {
    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }
  

  async deleteCliente(id) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
