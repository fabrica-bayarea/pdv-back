import { Module } from '@nestjs/common';
import { SolicitacaoCompraService } from './solicitacao_compra.service';
import { SolicitacaoCompraController } from './solicitacao_compra.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteService } from '../cliente/cliente.service';
import { VendedorService } from '../vendedor/vendedor.service';

@Module({
  controllers: [SolicitacaoCompraController],
  providers: [SolicitacaoCompraService, PrismaService, ClienteService, VendedorService],
})
export class SolicitacaoCompraModule {}
