import { Module } from '@nestjs/common';
import { FinalizadorService } from './finalizador.service';
import { FinalizadorController } from './finalizador.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FinalizadorController],
  providers: [FinalizadorService, PrismaService],
})
export class FinalizadorModule {}
