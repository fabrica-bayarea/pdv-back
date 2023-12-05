import { Module } from '@nestjs/common';
import { ProdutoSolicitacaoService } from './produto_solicitacao.service';
import { ProdutoSolicitacaoController } from './produto_solicitacao.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SolicitacaoCompraService } from '../solicitacao_compra/solicitacao_compra.service';
import { ProdutoService } from '../produto/produto.service';
import { ClienteService } from '../cliente/cliente.service';
import { VendedorService } from '../vendedor/vendedor.service';
import { CategoriaService } from '../categoria/categoria.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';

@Module({
  controllers: [ProdutoSolicitacaoController],
  providers: [ProdutoSolicitacaoService, PrismaService,SolicitacaoCompraService,ClienteService,VendedorService,ProdutoService,CategoriaService,FornecedorService],
})
export class ProdutoSolicitacaoModule {}
