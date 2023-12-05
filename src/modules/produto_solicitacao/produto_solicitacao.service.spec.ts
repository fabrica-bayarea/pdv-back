import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoSolicitacaoService } from './produto_solicitacao.service';

describe('ProdutoSolicitacaoService', () => {
  let service: ProdutoSolicitacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoSolicitacaoService],
    }).compile();

    service = module.get<ProdutoSolicitacaoService>(ProdutoSolicitacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
