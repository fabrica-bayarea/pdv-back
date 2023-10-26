import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProdutoModule } from './modules/produto/produto.module';

@Module({
  imports: [FornecedorModule, CategoriaModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
