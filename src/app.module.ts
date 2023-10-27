import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [FornecedorModule, CategoriaModule, ProdutoModule, AuthModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
