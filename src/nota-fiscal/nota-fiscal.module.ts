import { Module } from '@nestjs/common';
import { NotaFiscalController } from './nota-fiscal.controller';
import { NotaFiscalService } from './nota-fiscal.service';

@Module({
    controllers: [NotaFiscalController],
    providers: [NotaFiscalService]
})
export class NotaFiscalModule {
}
