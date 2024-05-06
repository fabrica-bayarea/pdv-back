import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';

@Module({
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}
