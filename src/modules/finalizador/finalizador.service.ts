import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Finalizador } from '.prisma/client'; // Verifique o caminho correto para o tipo Finalizador
import { CreateFinalizadorDto } from './dto/create-finalizador.dto';
import { ReturnFinalizadorDto } from './dto/return-finalizador.dto';
import { validate } from 'class-validator';

@Injectable()
export class FinalizadorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinalizadorDto: CreateFinalizadorDto): Promise<Finalizador> {
    const errors = await validate(createFinalizadorDto);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const existingFinalizador = await this.prisma.finalizador.findFirst({
      where: {
        OR: [
          { codigo: createFinalizadorDto.codigo},
        ],
      },
    });

    if (existingFinalizador) {
      throw new HttpException(`Já existe um finalizador com o código`, HttpStatus.BAD_REQUEST);
    }

    return this.prisma.finalizador.create({ data: createFinalizadorDto });
  }

  async findAll(): Promise<ReturnFinalizadorDto[]> {
    const finalizadores: Finalizador[] = await this.prisma.finalizador.findMany();

    // Mapeia os dados para o DTO antes de retorná-los
    return finalizadores.map((finalizador) => {
      const { id, codigo, nome, situacao, grupoReceita, bandeira } = finalizador;
      return { id, codigo, nome, situacao, grupoReceita, bandeira };
    });
  }

  async findOne(id: number): Promise<ReturnFinalizadorDto | null> {
    const finalizador: Finalizador | null = await this.prisma.finalizador.findUnique({ where: { id } });
  
    if (!finalizador) {
      throw new NotFoundException(`Finalizador com ID ${id} não encontrado`);
    }
  
    const { id: idFinalizador, codigo, nome, situacao, grupoReceita, bandeira } = finalizador;
    return { id: idFinalizador, codigo, nome, situacao, grupoReceita, bandeira };
  }

  async update(id: number, updateFinalizadorDto: CreateFinalizadorDto): Promise<Finalizador> {
    const { nome, situacao, grupoReceita, bandeira, codigo } = updateFinalizadorDto;

    const finalizador = await this.prisma.finalizador.findUnique({ where: { id } });
    const errors = await validate(updateFinalizadorDto);

    if (!finalizador) {
      throw new NotFoundException(`Finalizador com ID ${id} não encontrado`);
    }

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    if (
      updateFinalizadorDto.codigo &&
      updateFinalizadorDto.codigo !== finalizador.codigo
    ) {
      const existingFinalizador = await this.prisma.finalizador.findFirst({
        where: {
          OR: [
            { codigo: updateFinalizadorDto.codigo},
          ],
        },
      });

      if (existingFinalizador) {
        throw new HttpException(`Já existe um finalizador com o código`, HttpStatus.BAD_REQUEST);
      }
    }
    return this.prisma.finalizador.update({
      where: { id },
      data: { nome, situacao, grupoReceita, bandeira, codigo }, 
    });
  }

  async remove(id: number): Promise<void> {
    const finalizador: Finalizador | null = await this.prisma.finalizador.findUnique({ where: { id } });

    if (!finalizador) {
      throw new NotFoundException(`Finalizador com ID ${id} não encontrado`);
    }
    await this.prisma.finalizador.delete({ where: { id } });
  }
}
