import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EstoqueService,PrismaService],
  controllers: [EstoqueController]
})
export class EstoqueModule {}
