import { Module } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotaFiscalController } from './nota-fiscal.controller';

@Module({
    controllers: [NotaFiscalController],
    providers: [NotaFiscalService, PrismaService]
})
export class NotaFiscalModule {
}
