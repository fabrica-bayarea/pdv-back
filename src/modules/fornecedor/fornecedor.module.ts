import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FornecedorController],
  providers: [FornecedorService, PrismaService],
})
export class FornecedorModule {}
