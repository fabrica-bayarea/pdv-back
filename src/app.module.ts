import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [FornecedorModule, CategoriaModule, ProdutoModule, AuthModule, UsuarioModule],
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
