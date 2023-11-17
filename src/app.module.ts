import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { VendedorModule } from './modules/vendedor/vendedor.module';
import { NotaFiscalModule } from './modules/nota-fiscal/nota-fiscal.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContagemMensalModule } from './modules/contagem-mensal/contagem-mensal.module';
import { NotaFiscalEntradaModule } from './modules/nota-fiscal-entrada/nota-fiscal-entrada.module';
import { ItemModule } from './modules/items/items.module';

@Module({
  imports: [FornecedorModule, CategoriaModule, ProdutoModule, AuthModule, VendedorModule, NotaFiscalModule, ContagemMensalModule, NotaFiscalEntradaModule, PrismaModule, ItemModule],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
