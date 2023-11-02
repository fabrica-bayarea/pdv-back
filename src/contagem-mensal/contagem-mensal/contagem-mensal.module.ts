import { Module } from '@nestjs/common';
import { ContagemMensalService } from './contagem-mensal.service';
import { ContagemMensalController } from './ContagemMensalController';

@Module({
  controllers: [ContagemMensalController],
  providers: [ContagemMensalService]
})
export class ContagemMensalModule {

}