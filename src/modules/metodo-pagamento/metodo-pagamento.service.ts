import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetodoPagamentoDto } from './dto/metodo-pagamento.dto';

@Injectable()
export class MetodoPagamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMetodoPagamentoDto: CreateMetodoPagamentoDto): Promise<MetodoPagamentoDto> {
    const newMetodoPagamento = await this.prisma.metodoPagamento.create({ data: createMetodoPagamentoDto });
    return { id: newMetodoPagamento.id, tipo: newMetodoPagamento.tipo };
  }

  async findAll(): Promise<MetodoPagamentoDto[]> {
    const metodoPagamentos = await this.prisma.metodoPagamento.findMany();
    return metodoPagamentos.map(metodoPagamento => ({ id: metodoPagamento.id, tipo: metodoPagamento.tipo }));
  }

  async findOne(id: number): Promise<MetodoPagamentoDto> {
    const metodoPagamento = await this.prisma.metodoPagamento.findUnique({ where: { id } });
    if (!metodoPagamento) {
      throw new NotFoundException(`MetodoPagamento with ID ${id} not found.`);
    }
    return { id: metodoPagamento.id, tipo: metodoPagamento.tipo };
  }

  async update(id: number, updateMetodoPagamentoDto: UpdateMetodoPagamentoDto): Promise<MetodoPagamentoDto> {
    const updatedMetodoPagamento = await this.prisma.metodoPagamento.update({
      where: { id },
      data: updateMetodoPagamentoDto,
    });
    return { id: updatedMetodoPagamento.id, tipo: updatedMetodoPagamento.tipo };
  }

  async remove(id: number): Promise<MetodoPagamentoDto> {
    const deletedMetodoPagamento = await this.findOne(id);
    await this.prisma.metodoPagamento.delete({ where: { id } });
    return deletedMetodoPagamento;
  }
}
