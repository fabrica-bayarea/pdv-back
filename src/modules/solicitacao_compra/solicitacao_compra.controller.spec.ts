import { Test, TestingModule } from '@nestjs/testing';
import { SolicitacaoCompraController } from './solicitacao_compra.controller';
import { SolicitacaoCompraService } from './solicitacao_compra.service';

describe('SolicitacaoCompraController', () => {
  let controller: SolicitacaoCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitacaoCompraController],
      providers: [SolicitacaoCompraService],
    }).compile();

    controller = module.get<SolicitacaoCompraController>(SolicitacaoCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
