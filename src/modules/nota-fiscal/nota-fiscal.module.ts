import { Module } from '@nestjs/common';
import { NotaFiscalController } from './nota-fiscal.controller';
import { NotaFiscalService } from './nota-fiscal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [NotaFiscalController],
    providers: [NotaFiscalService, PrismaService]
})
export class NotaFiscalModule {
}
