import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';

@Module({
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
})
export class CarrinhoModule {}
