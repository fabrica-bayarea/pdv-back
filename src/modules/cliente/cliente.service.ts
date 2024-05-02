import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDTO } from './dto/create-cliente.dto';
import { ReturnClienteDTO} from './dto/return-cliente.dto';
import { UpdateClienteDTO } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  findOne(idCliente: number): { id: number; cpf: string; email: string; nome: string; telefone: string; endereco: string; data_nascimento: Date; data_criacao: Date; } | PromiseLike<{ id: number; cpf: string; email: string; nome: string; telefone: string; endereco: string; data_nascimento: Date; data_criacao: Date; }> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async findAllClientes(): Promise<ReturnClienteDTO[]> {
    const clientes = await this.prisma.cliente.findMany();
    return clientes.map((cliente) => this.mapToReturnDto(cliente));
  }

  async findClienteById(id: number): Promise<ReturnClienteDTO> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    if (!cliente) {
      return null;
    }
    return this.mapToReturnDto(cliente);
  }

  async createCliente(data: CreateClienteDTO): Promise<ReturnClienteDTO> {
    const cliente = await this.prisma.cliente.create({
      data: {
        ...data,
        data_nascimento: new Date(data.data_nascimento),
      },
    });
    return this.mapToReturnDto(cliente);
  }

  async updateCliente(id: number, data: UpdateClienteDTO): Promise<ReturnClienteDTO> {
    const cliente = await this.prisma.cliente.update({
      where: { id },
      data: {
        ...data,
        data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined,
      },
    });
    return this.mapToReturnDto(cliente);
  }

  async deleteCliente(id: number): Promise<void> {
    await this.prisma.cliente.delete({ where: { id } });
  }

  private mapToReturnDto(cliente: any): ReturnClienteDTO {
    return {
      id: cliente.id,
      cpf: cliente.cpf,
      email: cliente.email,
      nome: cliente.nome,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      data_nascimento: cliente.data_nascimento,
      data_criacao: cliente.data_criacao,
    };
  }
}
