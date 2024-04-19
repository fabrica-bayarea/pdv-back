import { Module } from '@nestjs/common';
import { ItemCarrinhoService } from './item-carrinho.service';
import { ItemCarrinhoController } from './item-carrinho.controller';

@Module({
  controllers: [ItemCarrinhoController],
  providers: [ItemCarrinhoService],
})
export class ItemCarrinhoModule {}
