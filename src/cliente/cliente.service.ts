import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteService {
  constructor() {}

  async findAllClientes() {
    return prisma.cliente.findMany();
  }

  async findClienteById(id) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async createCliente(data) {
    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento).toISOString();
    }
  
    return prisma.cliente.create({
      data,
    });
  }
  

  async updateCliente(id, data) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }
  

  async deleteCliente(id) {
    return prisma.cliente.delete({
      where: { id },
    });
  }
}
