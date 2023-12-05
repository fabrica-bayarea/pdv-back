import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
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
    if (data.data_nascimento) {
      var partesTexto = data.data_nascimento.split('/');
      data.data_nascimento = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
    }
  
    return this.prisma.cliente.create({
      data,
    });
  }
  

  async updateCliente(id, data) {
    if (data.data_nascimento) {
      var partesTexto = data.data_nascimento.split('/');
      data.data_nascimento = new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
    }    
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
