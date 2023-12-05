import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';
import { CategoriaService } from '../categoria/categoria.service';
import { ReturnProdutoDto } from './dto/return-produto.dto';
import { Produto } from '@prisma/client';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriaService: CategoriaService,
    private readonly fornecedorService: FornecedorService, // Injete o serviço do fornecedor
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const errors = await validate(createProdutoDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const fornecedor = await this.fornecedorService.findByCnpj(
      createProdutoDto.cnpj_fornecedor,
    );

    if (!fornecedor) {
      throw new NotFoundException(
        `Fornecedor com CNPJ ${createProdutoDto.cnpj_fornecedor} não encontrado`,
      );
    }

    // Verifique se a categoria com o nome especificado existe
    let existingCategoria = await this.categoriaService.findOneByName(
      createProdutoDto.nome_categoria,
    );

    if (!existingCategoria) {
      // Se a categoria não existe, crie a categoria
      existingCategoria = await this.categoriaService.create({
        nome: createProdutoDto.nome_categoria,
      });
    }

    // Verifique se já existe um produto com a mesma combinação de nome, marca e fornecedor
    const existingProduct = await this.prisma.produto.findFirst({
      where: {
        nome: createProdutoDto.nome,
        marca: createProdutoDto.marca,
        id_fornecedor: fornecedor.id,
      },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Já existe um produto com o mesmo nome, marca e fornecedor.`,
      );
    }

    const existingProductCode = await this.prisma.produto.findFirst({
      where: {
        codigo_produto: createProdutoDto.codigo_produto,
      },
    });

    if (existingProductCode) {
      throw new ConflictException(`Já existe um produto com o mesmo codigo.`);
    }

    const novoProduto = await this.prisma.produto.create({
      data: {
        nome: createProdutoDto.nome,
        marca: createProdutoDto.marca,
        descricao: createProdutoDto.descricao,
        id_fornecedor: fornecedor.id,
        id_categoria: existingCategoria.id,
        codigo_produto: createProdutoDto.codigo_produto,
        unidade_medida: createProdutoDto.unidade_medida,
        preco: createProdutoDto.preco,
        estoque_atual: createProdutoDto.estoque_atual,
      },
    });

    return novoProduto;
  }

  async findAll(): Promise<ReturnProdutoDto[]> {
    const produtos = await this.prisma.produto.findMany({
      include: {
        // Inclua as relações necessárias para mapear os campos no ReturnProdutoDto
        categoria: true,
        fornecedor: true,
      },
    });

    // Mapeie os produtos para o ReturnProdutoDto
    return produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      descricao: produto.descricao,
      nome_categoria: produto.categoria.nome,
      cnpj_fornecedor: produto.fornecedor.cnpj,
      codigo_produto: produto.codigo_produto,
      unidade_medida: produto.unidade_medida,
      preco: produto.preco,
      estoque_atual: produto.estoque_atual,
      data_criacao: produto.data_criacao,
    }));
  }

  async findOne(id: number): Promise<ReturnProdutoDto> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
        fornecedor: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado`);
    }

    return {
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      descricao: produto.descricao,
      nome_categoria: produto.categoria.nome,
      cnpj_fornecedor: produto.fornecedor.cnpj,
      codigo_produto: produto.codigo_produto,
      unidade_medida: produto.unidade_medida,
      preco: produto.preco,
      estoque_atual: produto.estoque_atual,
      data_criacao: produto.data_criacao,
    };
  }

  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    // Verifique se o produto com o ID especificado existe
    const existingProduto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!existingProduto) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado`);
    }

    const errors = await validate(updateProdutoDto);

    if (errors.length > 0) {
      // Se houver erros de validação, lance uma exceção com detalhes
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Verifique se o fornecedor com o CNPJ especificado existe
    const fornecedor = await this.fornecedorService.findByCnpj(
      updateProdutoDto.cnpj_fornecedor,
    );

    if (!fornecedor) {
      throw new NotFoundException(
        `Fornecedor com CNPJ ${updateProdutoDto.cnpj_fornecedor} não encontrado`,
      );
    }

    // Verifique se houve mudança nos campos nome, marca ou cnpj_fornecedor
    if (
      updateProdutoDto.nome !== existingProduto.nome ||
      updateProdutoDto.marca !== existingProduto.marca ||
      fornecedor.id !== existingProduto.id
    ) {
      // Verifique se já existe algum produto com a mesma combinação de nome, marca e cnpj_fornecedor
      const existingProductWithSameFields = await this.prisma.produto.findFirst(
        {
          where: {
            nome: updateProdutoDto.nome,
            marca: updateProdutoDto.marca,
            id_fornecedor: fornecedor.id,
            NOT: {
              id: id, // Excluir o produto atual da verificação
            },
          },
        },
      );

      if (existingProductWithSameFields) {
        throw new ConflictException(
          `Já existe um produto com a mesma combinação de nome, marca e CNPJ de fornecedor`,
        );
      }
    }

    if (updateProdutoDto.codigo_produto !== existingProduto.codigo_produto) {
      const existingProductCode = await this.prisma.produto.findFirst({
        where: {
          codigo_produto: updateProdutoDto.codigo_produto,
        },
      });

      if (existingProductCode) {
        throw new ConflictException(`Já existe um produto com o mesmo codigo.`);
      }
    }

    // Verifique se a categoria com o nome especificado existe
    let existingCategoria = await this.categoriaService.findOneByName(
      updateProdutoDto.nome_categoria,
    );

    if (!existingCategoria) {
      // Se a categoria não existe, crie a categoria
      existingCategoria = await this.categoriaService.create({
        nome: updateProdutoDto.nome_categoria,
      });
    }

    // Atualize os dados do produto
    const updatedProduto = await this.prisma.produto.update({
      where: { id },
      data: {
        nome: updateProdutoDto.nome,
        marca: updateProdutoDto.marca,
        descricao: updateProdutoDto.descricao,
        id_fornecedor: fornecedor.id,
        id_categoria: existingCategoria.id,
        codigo_produto: updateProdutoDto.codigo_produto,
        unidade_medida: updateProdutoDto.unidade_medida,
        preco: updateProdutoDto.preco,
        estoque_atual: updateProdutoDto.estoque_atual,
      },
    });

    return updatedProduto;
  }

  async remove(id: number): Promise<void> {
    // Verifique se o produto com o ID especificado existe
    const existingProduto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!existingProduto) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado`);
    }

    // Use o Prisma para remover o produto pelo ID
    await this.prisma.produto.delete({
      where: { id },
    });
  }
  async findByCodigoProduto(codigoProduto: string): Promise<Produto | null> {
    const produto = await this.prisma.produto.findFirst({
      where: {
        codigo_produto: codigoProduto,
      },
    });
  
    return produto;
  }
  async descontarEstoque(codigoProduto: string, quantidade: number): Promise<void> {
    const existingProduto = await this.findByCodigoProduto(codigoProduto);

    if (!existingProduto) {
      throw new NotFoundException(`Produto com código ${codigoProduto} não encontrado`);
    }

    if (existingProduto.estoque_atual < quantidade) {
      throw new BadRequestException(`Quantidade insuficiente em estoque para o produto ${codigoProduto}`);
    }

    const novoEstoque = existingProduto.estoque_atual - quantidade;

    await this.prisma.produto.update({
      where: { id:existingProduto.id },
      data: { estoque_atual: novoEstoque },
    });
  }
}
