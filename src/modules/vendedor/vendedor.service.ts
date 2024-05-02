import { Injectable } from '@nestjs/common';
import { Prisma, Vendedor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendedorDTO } from './dto/create-vendedor.dto';

@Injectable()
export class VendedorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Vendedor[]> {
    return this.prisma.vendedor.findMany();
  }

  async findOne(id: number): Promise<Vendedor | null> {
    return this.prisma.vendedor.findUnique({
      where: { id },
    });
  }

  async create(data: CreateVendedorDTO): Promise<Vendedor> {
    return this.prisma.vendedor.create({
      data: {
        cpf: data.cpf,
        email: data.email,
        nome: data.nome,
        telefone: data.telefone,
        endereco: data.endereco,
        data_nascimento: data.data_nascimento,
      },
    });
  }

  async update(id: number, data: CreateVendedorDTO): Promise<Vendedor | null> {
    return this.prisma.vendedor.update({
      where: { id },
      data: {
        cpf: data.cpf,
        email: data.email,
        nome: data.nome,
        telefone: data.telefone,
        endereco: data.endereco,
        data_nascimento: data.data_nascimento,
      },
    });
  }

  async deleteVendedor(id: number): Promise<void> {
    await this.prisma.vendedor.delete({
      where: { id },
    });
  }
}
