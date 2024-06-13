import { Module } from '@nestjs/common';
import { MetodoPagamentoService } from './metodo-pagamento.service';
import { MetodoPagamentoController } from './metodo-pagamento.controller';

@Module({
  controllers: [MetodoPagamentoController],
  providers: [MetodoPagamentoService],
})
export class MetodoPagamentoModule {}
