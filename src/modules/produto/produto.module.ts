import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaService } from '../categoria/categoria.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    PrismaService,
    CategoriaService,
    FornecedorService,
  ],
})
export class ProdutoModule {}
