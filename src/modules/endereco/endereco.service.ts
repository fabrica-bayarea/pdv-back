import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnderecoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnderecoDto: CreateEnderecoDto) {
    const novoEndereco = await this.prisma.endereco.create({
      data: createEnderecoDto,
    });
    return novoEndereco;
  }

  async findAll() {
    const todosEnderecos = await this.prisma.endereco.findMany();
    return todosEnderecos;
  }

  async findOne(id: number) {
    const endereco = await this.prisma.endereco.findUnique({
      where: { id },
    });
    if (!endereco) {
      throw new NotFoundException(`Endereco com ID #${id} não encontrado`);
    }
    return endereco;
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    const endereco = await this.findOne(id);
    return this.prisma.endereco.update({
      where: { id },
      data: updateEnderecoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.endereco.delete({
      where: { id },
    });
  }
}
