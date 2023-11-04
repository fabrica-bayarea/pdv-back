import { Module } from '@nestjs/common';
import { NotaFiscalEntradaService } from './nota-fiscal-entrada.service';
import { NotaFiscalEntradaController } from './nota-fiscal-entrada.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [NotaFiscalEntradaService, PrismaService],
  exports: [NotaFiscalEntradaService],
  controllers: [NotaFiscalEntradaController]
})
export class NotaFiscalEntradaModule {
  
}
