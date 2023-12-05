import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoSolicitacaoController } from './produto_solicitacao.controller';
import { ProdutoSolicitacaoService } from './produto_solicitacao.service';

describe('ProdutoSolicitacaoController', () => {
  let controller: ProdutoSolicitacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoSolicitacaoController],
      providers: [ProdutoSolicitacaoService],
    }).compile();

    controller = module.get<ProdutoSolicitacaoController>(ProdutoSolicitacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
