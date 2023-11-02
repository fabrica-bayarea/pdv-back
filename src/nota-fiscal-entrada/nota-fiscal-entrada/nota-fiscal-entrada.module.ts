import { Module } from '@nestjs/common';
import { NotaFiscalEntradaService } from './nota-fiscal-entrada.service';
import { NotaFiscalEntradaController } from './nota-fiscal-entrada.controller';

@Module({
  controllers: [NotaFiscalEntradaController],
  providers: [NotaFiscalEntradaService],
})
export class AppModule {
  
}
