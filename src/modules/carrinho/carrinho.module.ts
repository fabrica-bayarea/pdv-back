import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.controller';
import { CarrinhoController } from './carrinho.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteService } from '../cliente/cliente.service';

@Module({
  controllers: [CarrinhoController],
  providers: [CarrinhoService, PrismaService, ClienteService]
})
export class CarrinhoModule {}
