import { Module } from '@nestjs/common';
import { ContagemMensalService } from './contagem-mensal.service';
import { ContagemMensalController } from './contagem-mensal.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ContagemMensalController],
  providers: [ContagemMensalService, PrismaService]
})
export class ContagemMensalModule {

}