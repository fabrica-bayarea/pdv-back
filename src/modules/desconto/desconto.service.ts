import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescontoDto } from './dto/create-desconto.dto';
import { UpdateDescontoDto } from './dto/update-desconto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DescontoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDescontoDto: CreateDescontoDto) {
    const newDesconto = await this.prisma.desconto.create({
      data: createDescontoDto,
    });
    return newDesconto;
  }

  async findAll() {
    const allDescontos = await this.prisma.desconto.findMany();
    return allDescontos;
  }

  async findOne(id: number) {
    const desconto = await this.prisma.desconto.findUnique({
      where: { id },
    });
    if (!desconto) {
      throw new NotFoundException(`Desconto with ID ${id} not found.`);
    }
    return desconto;
  }

  async update(id: number, updateDescontoDto: UpdateDescontoDto) {
    const updatedDesconto = await this.prisma.desconto.update({
      where: { id },
      data: updateDescontoDto,
    });
    return updatedDesconto;
  }

  async remove(id: number) {
    const deletedDesconto = await this.prisma.desconto.delete({
      where: { id },
    });
    return deletedDesconto;
  }
}
