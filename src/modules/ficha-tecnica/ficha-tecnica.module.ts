import { Module } from '@nestjs/common';
import { FichaTecnicaController } from './ficha-tecnica.controller'; 
import { FichaTecnicaService } from './ficha-tecnica.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FichaTecnicaController],
  providers: [FichaTecnicaService, PrismaService]
})
export class FichaTecnicaModule {}
