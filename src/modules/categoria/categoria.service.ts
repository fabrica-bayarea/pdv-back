import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import { ReturnCategoriaDto } from './dto/return-categoria.dto';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const errors = await validate(createCategoriaDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const existingCategoria = await this.prisma.categoria.findFirst({
      where: {
        nome: createCategoriaDto.nome,
      },
    });

    if (existingCategoria) {
      // Se uma categoria com o mesmo nome já existe, lance uma exceção
      throw new HttpException(
        'Categoria com o mesmo nome já existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const novaCategoria = await this.prisma.categoria.create({
      data: createCategoriaDto,
    });

    return novaCategoria;
  }

  async findAll(): Promise<ReturnCategoriaDto[]> {
    // Use o PrismaService para buscar todas as categorias
    const categorias = await this.prisma.categoria.findMany();

    // Mapeie as categorias para o DTO desejado (ReturnCategoriaDto)
    const categoriasDto = categorias.map((categoria) => {
      return {
        nome: categoria.nome,
      };
    });

    return categoriasDto;
  }

  async findOne(id: number): Promise<ReturnCategoriaDto> {
    // Use o PrismaService para buscar a categoria pelo ID
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      // Se a categoria com o ID especificado não for encontrada, lance uma exceção
      throw new NotFoundException(`Categoria com ID #${id} não encontrada`);
    }

    // Mapeie a categoria para o DTO desejado (ReturnCategoriaDto)
    const categoriaDto: ReturnCategoriaDto = {
      nome: categoria.nome,
    };

    return categoriaDto;
  }

  async findOneByName(nome: string): Promise<Categoria> {
    // Use o PrismaService para buscar a categoria pelo nome
    const categoria = await this.prisma.categoria.findFirst({
      where: {
        nome: nome,
      },
    });

    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<ReturnCategoriaDto> {
    const { nome } = updateCategoriaDto;

    // Use o PrismaService para buscar a categoria pelo ID
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      // Se a categoria com o ID especificado não for encontrada, lance uma exceção
      throw new NotFoundException(`Categoria com ID #${id} não encontrada`);
    }

    const errors = await validate(updateCategoriaDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Verifique se já existe uma categoria com o mesmo nome
    const existingCategoria = await this.prisma.categoria.findFirst({
      where: {
        nome,
        NOT: { id },
      },
    });

    if (existingCategoria) {
      // Se já existe uma categoria com o mesmo nome, lance uma exceção de conflito
      throw new ConflictException('Já existe uma categoria com esse nome');
    }

    // Use o PrismaService para atualizar a categoria com os dados fornecidos em updateCategoriaDto
    const updatedCategoria = await this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });

    // Mapeie a categoria atualizada para o DTO desejado (ReturnCategoriaDto)
    const categoriaDto: ReturnCategoriaDto = {
      nome: updatedCategoria.nome,
    };

    return categoriaDto;
  }

  async remove(id: number): Promise<void> {
    // Use o PrismaService para buscar a categoria pelo ID
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      // Se a categoria com o ID especificado não for encontrada, lance uma exceção de not found
      throw new NotFoundException(`Categoria com ID #${id} não encontrada`);
    }

    // Use o PrismaService para deletar a categoria pelo ID
    await this.prisma.categoria.delete({
      where: { id },
    });
  }
}
