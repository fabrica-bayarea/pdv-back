import { Injectable } from '@nestjs/common';
import { PrismaClient, Vendedor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendedorService {
  constructor( private prisma: PrismaService) {}

  async findAll(): Promise<Vendedor[]> {
    return this.prisma.vendedor.findMany();
  }

  async findOne(id: number): Promise<Vendedor | null> {
    return this.prisma.vendedor.findUnique({
      where: { id },
    });
  }

  async create(data) {
    if (data.dataNascimento) {
      data.dataNascimento = this.converterDataParaIso(data.dataNascimento);
    }
    return this.prisma.vendedor.create({
      data,
    });
  }

  async update(id: number, data): Promise<Vendedor | null> {
    if (data.dataNascimento) {
      data.dataNascimento = this.converterDataParaIso(data.dataNascimento);
    }
    return this.prisma.vendedor.update({
      where: { id },
      data,
    });
  }

  private converterDataParaIso(dataDiaMesAno: string): string {
    if (!dataDiaMesAno) {
      return dataDiaMesAno;
    }
    var partesTexto = dataDiaMesAno.split('/');
    return new Date(`${partesTexto[2]}-${partesTexto[1]}-${partesTexto[0]}`).toISOString();
  }

  async deleteVendedor(id: number): Promise<void> {
    console.log('id vendedor para delecao', id) ;
    this.prisma.vendedor.delete({
      where: { id },
    }).then(response => {
      console.log('Sucesso ao excluir vendedor:', response);
    }).catch((error) => {
      console.error('Erro ao excluir vendedor:', error);
    })
  }
}
