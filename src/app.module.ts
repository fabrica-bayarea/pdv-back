import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { NotaFiscalModule } from './nota-fiscal/nota-fiscal.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContagemMensalModule } from './contagem-mensal/contagem-mensal/contagem-mensal.module';
import { NotaFiscalEntradaModule } from './nota-fiscal-entrada/nota-fiscal-entrada/nota-fiscal-entrada.module';

@Module({
  imports: [ClienteModule, VendedorModule, NotaFiscalModule, ContagemMensalModule, NotaFiscalEntradaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
