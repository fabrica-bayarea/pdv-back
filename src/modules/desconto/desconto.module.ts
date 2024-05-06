import { Module } from '@nestjs/common';
import { DescontoService } from './desconto.service';
import { DescontoController } from './desconto.controller';

@Module({
  controllers: [DescontoController],
  providers: [DescontoService],
})
export class DescontoModule {}
