import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoSolicitacaoDto } from './dto/create-produto_solicitacao.dto';
import { UpdateProdutoSolicitacaoDto } from './dto/update-produto_solicitacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnProdutoSolicitacaoDto } from './dto/return-produto_solicitacao.dto';
import { SolicitacaoCompraService } from '../solicitacao_compra/solicitacao_compra.service';
import { ProdutoService } from '../produto/produto.service';
import { ReturnProdutoSolicitacaoCompletoDto } from './dto/return-produto_solicitacao_completo.dto';

@Injectable()
export class ProdutoSolicitacaoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly produtoService: ProdutoService,
    private readonly solicitacaoCompraService: SolicitacaoCompraService,
  ) {}
  async create(createProdutoSolicitacaoDto: CreateProdutoSolicitacaoDto): Promise<ReturnProdutoSolicitacaoCompletoDto> {
    const { solicitacaoCompraId, codigo_produto, quantidade } = createProdutoSolicitacaoDto;
  
    // Verificar se a solicitação de compra existe
    const solicitacaoCompra = await this.solicitacaoCompraService.findOne(solicitacaoCompraId);
    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${solicitacaoCompraId} não encontrada`);
    }
  
    if(!solicitacaoCompra.ativo){
      throw new BadRequestException("Solicitação requerida está encerrada.");
    }
  
    // Verificar se o código do produto existe
    const produto = await this.produtoService.findByCodigoProduto(codigo_produto);
    if (!produto) {
      throw new NotFoundException(`Produto com código ${codigo_produto} não encontrado`);
    }
  
    // Verificar se já existe uma solicitação com o mesmo código de produto
    const existingProdutoSolicitacao = await this.prisma.produtoSolicitacao.findFirst({
      where: {
        codigo_produto,
        solicitacaoCompraId,
      },
    });
  
    if (existingProdutoSolicitacao) {
      // Se já existir, atualize a quantidade na entidade existente
      const updatedProdutoSolicitacao = await this.prisma.produtoSolicitacao.update({
        where: {
          id: existingProdutoSolicitacao.id,
        },
        data: {
          quantidade: {
            increment: quantidade,
          },
        },
      });
  
      const returnProdutoSolicitacaoCompletoDto: ReturnProdutoSolicitacaoCompletoDto = {
        id: updatedProdutoSolicitacao.id,
        solicitacaoCompraId: updatedProdutoSolicitacao.solicitacaoCompraId,
        codigo_produto: updatedProdutoSolicitacao.codigo_produto,
        nome_produto: produto.nome,
        quantidade: updatedProdutoSolicitacao.quantidade,
        valor_unit: produto.preco,
        valor_subtotal: updatedProdutoSolicitacao.quantidade * produto.preco,
        controle: updatedProdutoSolicitacao.controle,
        descricao: updatedProdutoSolicitacao.descricao,
      };
  
      return returnProdutoSolicitacaoCompletoDto;
    }
  
    // Se não existir, crie uma nova entrada
    const novoProdutoSolicitacao = await this.prisma.produtoSolicitacao.create({
      data: createProdutoSolicitacaoDto,
    });
  
    const returnProdutoSolicitacaoCompletoDto: ReturnProdutoSolicitacaoCompletoDto = {
      id: novoProdutoSolicitacao.id,
      solicitacaoCompraId: novoProdutoSolicitacao.solicitacaoCompraId,
      codigo_produto: novoProdutoSolicitacao.codigo_produto,
      nome_produto: produto.nome,
      quantidade: novoProdutoSolicitacao.quantidade,
      valor_unit: produto.preco,
      valor_subtotal: novoProdutoSolicitacao.quantidade * produto.preco,
      controle: novoProdutoSolicitacao.controle,
      descricao: novoProdutoSolicitacao.descricao,
    };
  
    return returnProdutoSolicitacaoCompletoDto;
  }

  async findAll(): Promise<ReturnProdutoSolicitacaoCompletoDto[]> {
    const produtoSolicitacoes = await this.prisma.produtoSolicitacao.findMany();
  
    const produtosCompletos: ReturnProdutoSolicitacaoCompletoDto[] = [];
  
    for (const produtoSolicitacao of produtoSolicitacoes) {
      const produto = await this.produtoService.findByCodigoProduto(produtoSolicitacao.codigo_produto);
  
      if (produto) {
        const produtoCompleto: ReturnProdutoSolicitacaoCompletoDto = {
          id: produtoSolicitacao.id,
          solicitacaoCompraId: produtoSolicitacao.solicitacaoCompraId,
          codigo_produto: produtoSolicitacao.codigo_produto,
          nome_produto: produto.nome,
          quantidade: produtoSolicitacao.quantidade,
          valor_unit: produto.preco,
          valor_subtotal: produtoSolicitacao.quantidade * produto.preco,
          controle: produtoSolicitacao.controle,
          descricao: produtoSolicitacao.descricao,
        };
  
        produtosCompletos.push(produtoCompleto);
      }
    }
  
    return produtosCompletos;
  }
  

  async findOne(id: number): Promise<ReturnProdutoSolicitacaoCompletoDto> {
    const produtoSolicitacao = await this.prisma.produtoSolicitacao.findUnique({
      where: { id },
    });
  
    if (!produtoSolicitacao) {
      throw new NotFoundException(`ProdutoSolicitacao with ID ${id} not found`);
    }
  
    const produto = await this.produtoService.findByCodigoProduto(produtoSolicitacao.codigo_produto);
  
    if (!produto) {
      throw new NotFoundException(`Product with code ${produtoSolicitacao.codigo_produto} not found`);
    }
  
    const produtoCompleto: ReturnProdutoSolicitacaoCompletoDto = {
      id: produtoSolicitacao.id,
      solicitacaoCompraId: produtoSolicitacao.solicitacaoCompraId,
      codigo_produto: produtoSolicitacao.codigo_produto,
      nome_produto: produto.nome,
      quantidade: produtoSolicitacao.quantidade,
      valor_unit: produto.preco,
      valor_subtotal: produtoSolicitacao.quantidade * produto.preco,
      controle: produtoSolicitacao.controle,
      descricao: produtoSolicitacao.descricao,
    };
  
    return produtoCompleto;
  }

  async update(id: number, updateProdutoSolicitacaoDto: UpdateProdutoSolicitacaoDto): Promise<ReturnProdutoSolicitacaoCompletoDto> {
    const produtoSolicitacao = await this.prisma.produtoSolicitacao.findUnique({
      where: { id },
    });
  
    if (!produtoSolicitacao) {
      throw new NotFoundException(`ProdutoSolicitacao with ID ${id} not found`);
    }
  
    if (
      updateProdutoSolicitacaoDto.solicitacaoCompraId !== produtoSolicitacao.solicitacaoCompraId ||
      updateProdutoSolicitacaoDto.codigo_produto !== produtoSolicitacao.codigo_produto
    ) {
      throw new BadRequestException('solicitacaoCompraId and codigo_produto cannot be changed');
    }
  
    const updatedProdutoSolicitacao = await this.prisma.produtoSolicitacao.update({
      where: { id },
      data: {
        quantidade: updateProdutoSolicitacaoDto.quantidade,
        controle: updateProdutoSolicitacaoDto.controle,
        descricao: updateProdutoSolicitacaoDto.descricao,
        // Outros campos que podem ser atualizados caso sejam alterados
      },
    });

    const produto = await this.produtoService.findByCodigoProduto(produtoSolicitacao.codigo_produto);
  
    const returnProdutoSolicitacaoCompletoDto: ReturnProdutoSolicitacaoCompletoDto = {
      id: updatedProdutoSolicitacao.id,
      solicitacaoCompraId: updatedProdutoSolicitacao.solicitacaoCompraId,
      codigo_produto: updatedProdutoSolicitacao.codigo_produto,
      nome_produto: produto.nome,
      quantidade: updatedProdutoSolicitacao.quantidade,
      valor_unit: produto.preco,
      valor_subtotal: updatedProdutoSolicitacao.quantidade * produto.preco,
      controle: updatedProdutoSolicitacao.controle,
      descricao: updatedProdutoSolicitacao.descricao,
    };
  
    return returnProdutoSolicitacaoCompletoDto;
  }  

  async remove(id: number): Promise<void> {
    const produtoSolicitacao = await this.prisma.produtoSolicitacao.findUnique({
      where: { id },
    });

    if (!produtoSolicitacao) {
      throw new NotFoundException(`ProdutoSolicitacao with ID ${id} not found`);
    }

    await this.prisma.produtoSolicitacao.delete({
      where: { id },
    });
  }
  async removeByCodigoProduto(solicitacaoCompraId: number, codigo_produto: string): Promise<void> {
    const produtoSolicitacao = await this.prisma.produtoSolicitacao.findFirst({
      where: { solicitacaoCompraId, codigo_produto },
    });
    
    if (!produtoSolicitacao) {
      throw new NotFoundException(`ProdutoSolicitacao with ${solicitacaoCompraId} or ${codigo_produto} not found`);
    }

    const solicitacaoCompra = await this.solicitacaoCompraService.findOne(solicitacaoCompraId);
  
    if(!solicitacaoCompra.ativo){
      throw new BadRequestException("Solicitação requerida está encerrada.");
    }
  
    if (produtoSolicitacao) {
      await this.prisma.produtoSolicitacao.delete({
        where: { id: produtoSolicitacao.id },
      });
    }
  }
  async cancelar(solicitacaoCompraId: number): Promise<void> {
    const solicitacaoCompra = await this.solicitacaoCompraService.findOne(solicitacaoCompraId);
    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${solicitacaoCompraId} não encontrada`);
    }
  
    if(!solicitacaoCompra.ativo){
      throw new BadRequestException("Solicitação requerida está encerrada.");
    }

    // Verificar se existem solicitações de produtos associadas ao solicitacaoCompraId
    const existemSolicitacoes = await this.prisma.produtoSolicitacao.findFirst({
      where: { solicitacaoCompraId },
    });
  
    if (!existemSolicitacoes) {
      throw new NotFoundException(
        `Nenhuma solicitação de produto encontrada para a solicitação de compra com ID ${solicitacaoCompraId}`
      );
    }
  
    // Excluir todas as solicitações de produtos com o solicitacaoCompraId especificado
    await this.prisma.produtoSolicitacao.deleteMany({
      where: { solicitacaoCompraId },
    });
  
    // Chamar a função desativar do SolicitacaoCompraService
    await this.solicitacaoCompraService.desativar(solicitacaoCompraId);
  }  
  async finalizar(solicitacaoCompraId: number): Promise<void> {
    const solicitacaoCompra = await this.solicitacaoCompraService.findOne(solicitacaoCompraId);
    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${solicitacaoCompraId} não encontrada`);
    }
  
    if(!solicitacaoCompra.ativo){
      throw new BadRequestException("Solicitação requerida está encerrada.");
    }

    // Encontrar todas as solicitações de produtos associadas ao solicitacaoCompraId
    const produtoSolicitacoes = await this.prisma.produtoSolicitacao.findMany({
      where: { solicitacaoCompraId },
    });

    if (!produtoSolicitacoes || produtoSolicitacoes.length === 0) {
      throw new NotFoundException(`Nenhuma solicitação de produto encontrada para a solicitação de compra com ID ${solicitacaoCompraId}`);
    }

    for (const produtoSolicitacao of produtoSolicitacoes) {
      // Encontrar o produto associado a esta solicitação de produto
      const produto = await this.produtoService.findByCodigoProduto(produtoSolicitacao.codigo_produto);

      if (!produto) {
        throw new NotFoundException(`Produto com código ${produtoSolicitacao.codigo_produto} não encontrado`);
      }

      // Descontar a quantidade do estoque do produto
      await this.produtoService.descontarEstoque(produtoSolicitacao.codigo_produto, produtoSolicitacao.quantidade);
    }

    // Desativar a solicitação de compra após a finalização
    await this.solicitacaoCompraService.desativar(solicitacaoCompraId);
  }
  async findAllBySolicitacaoCompraId(solicitacaoCompraId: number): Promise<ReturnProdutoSolicitacaoCompletoDto[]> {
    const produtoSolicitacoes = await this.prisma.produtoSolicitacao.findMany({
      where: {
        solicitacaoCompraId,
      },
    });
  
    const produtosCompletos: ReturnProdutoSolicitacaoCompletoDto[] = [];
  
    for (const produtoSolicitacao of produtoSolicitacoes) {
      const produto = await this.produtoService.findByCodigoProduto(produtoSolicitacao.codigo_produto);
  
      if (produto) {
        const produtoCompleto: ReturnProdutoSolicitacaoCompletoDto = {
          id: produtoSolicitacao.id,
          solicitacaoCompraId: produtoSolicitacao.solicitacaoCompraId,
          codigo_produto: produtoSolicitacao.codigo_produto,
          nome_produto: produto.nome,
          quantidade: produtoSolicitacao.quantidade,
          valor_unit: produto.preco,
          valor_subtotal: produtoSolicitacao.quantidade * produto.preco,
          controle: produtoSolicitacao.controle,
          descricao: produtoSolicitacao.descricao,
        };
  
        produtosCompletos.push(produtoCompleto);
      }
    }
  
    if (produtosCompletos.length === 0) {
      // Se não houver produtos para essa solicitação de compra, você pode retornar null ou lançar uma exceção
      // Aqui está um exemplo de lançamento de uma exceção NotFound caso nenhum produto seja encontrado
      throw new NotFoundException(`Nenhum produto encontrado para a solicitação de compra #${solicitacaoCompraId}`);
    }
  
    return produtosCompletos;
  }
  
}
