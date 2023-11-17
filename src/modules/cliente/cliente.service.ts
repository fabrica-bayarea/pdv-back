import { Injectable } from '@nestjs/common';
import { formatISO, parse } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async findAllClientes() {
    return this.prisma.cliente.findMany();
  }

  async findClienteById(id) {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async createCliente(data) {
    if (data.nascimento) {
      const dataParseada = parse(data.nascimento, 'dd/MM/yyyy', new Date());
      data.nascimento = formatISO(dataParseada);
    }
    return this.prisma.cliente.create({
      data,
    });
  }
  

  async updateCliente(id, data) {
    if (data.nascimento) {
      const dataParseada = parse(data.nascimento, 'dd/MM/yyyy', new Date());
      data.nascimento = formatISO(dataParseada);
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
