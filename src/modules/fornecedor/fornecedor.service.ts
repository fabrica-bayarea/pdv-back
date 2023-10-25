import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnFornecedorDto } from './dto/return-fornecedor.dto';
import { Fornecedor } from '@prisma/client';
import { validate } from 'class-validator';
import { addDays, format } from 'date-fns';

@Injectable()
export class FornecedorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    // Use o Class Validator para validar o DTO
    const errors = await validate(createFornecedorDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Verifique se já existe um fornecedor com o mesmo email ou CNPJ
    const existingFornecedor = await this.prisma.fornecedor.findFirst({
      where: {
        OR: [
          { email: createFornecedorDto.email },
          { cnpj: createFornecedorDto.cnpj },
        ],
      },
    });

    if (existingFornecedor) {
      // Se um fornecedor com o mesmo email ou CNPJ já existe, lance uma exceção
      throw new NotFoundException(
        'Fornecedor com o mesmo email ou CNPJ já existe',
      );
    }

    // Formate a data de nascimento para o formato ISO8601 (YYYY-MM-DD)
    const isoDate =
      createFornecedorDto.data_nascimento.split('/').reverse().join('-') +
      'T00:00:00.000Z';

    // Adicione a data formatada ao DTO antes de criar o fornecedor
    createFornecedorDto.data_nascimento = isoDate;
    // Se não houver um fornecedor com o mesmo email ou CNPJ, crie o novo fornecedor
    const newFornecedor = await this.prisma.fornecedor.create({
      data: createFornecedorDto,
    });

    return newFornecedor; // Retorna o fornecedor criado
  }

  async findAll(): Promise<ReturnFornecedorDto[]> {
    const fornecedores = await this.prisma.fornecedor.findMany();

    return fornecedores.map((fornecedor) => ({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      endereco: fornecedor.endereco,
      data_nascimento: format(
        addDays(new Date(fornecedor.data_nascimento), 1),
        'dd/MM/yyyy',
      ),
    }));
  }

  async findOne(id: number): Promise<ReturnFornecedorDto> {
    // Use o Prisma para buscar o fornecedor pelo ID
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      // Se nenhum fornecedor com o ID especificado for encontrado, lance uma exceção
      throw new NotFoundException(`Fornecedor com ID #${id} não encontrado`);
    }

    // Mapeie o fornecedor para o DTO desejado
    return {
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      endereco: fornecedor.endereco,
      data_nascimento: format(fornecedor.data_nascimento, 'dd/MM/yyyy'),
    };
  }

  async findByCnpj(cnpj: string): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedor.findFirst({
      where: { cnpj },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com CNPJ ${cnpj} não encontrado`);
    }

    return fornecedor;
  }

  async update(
    id: number,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    // Verifique se o fornecedor com o ID especificado existe
    const existingFornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!existingFornecedor) {
      // Se nenhum fornecedor com o ID especificado for encontrado, lance uma exceção
      throw new NotFoundException(`Fornecedor com ID #${id} não encontrado`);
    }

    // Use o Class Validator para validar o DTO
    const errors = await validate(updateFornecedorDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Verifique se o CNPJ ou o email foram modificados
    if (
      updateFornecedorDto.cnpj &&
      updateFornecedorDto.cnpj !== existingFornecedor.cnpj
    ) {
      // Verifique se já existe alguém com os mesmos campos de CNPJ ou email
      const duplicateCnpj = await this.prisma.fornecedor.findFirst({
        where: {
          OR: [{ cnpj: updateFornecedorDto.cnpj }],
        },
      });

      if (duplicateCnpj) {
        // Se já existe alguém com os mesmos campos de CNPJ ou email, lance uma exceção de conflito
        throw new ConflictException('Já existe um fornecedor com o mesmo CNPJ');
      }
    }
    if (
      updateFornecedorDto.email &&
      updateFornecedorDto.email !== existingFornecedor.email
    ) {
      const duplicateEmail = await this.prisma.fornecedor.findFirst({
        where: {
          OR: [{ email: updateFornecedorDto.email }],
        },
      });

      if (duplicateEmail) {
        // Se já existe alguém com os mesmos campos de CNPJ ou email, lance uma exceção de conflito
        throw new ConflictException(
          'Já existe um fornecedor com o mesmo email',
        );
      }
    }

    const isoDate =
      updateFornecedorDto.data_nascimento.split('/').reverse().join('-') +
      'T00:00:00.000Z';

    // Adicione a data formatada ao DTO antes de criar o fornecedor
    updateFornecedorDto.data_nascimento = isoDate;

    // Atualize os campos do fornecedor com base no DTO de atualização
    return this.prisma.fornecedor.update({
      where: { id },
      data: updateFornecedorDto,
    });
  }

  async remove(id: number): Promise<void> {
    const existingFornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!existingFornecedor) {
      // Se nenhum fornecedor com o ID especificado for encontrado, retorne nulo
      throw new NotFoundException(`Fornecedor com ID #${id} não encontrado`);
    }

    await this.prisma.fornecedor.delete({
      where: { id },
    });
  }
}
