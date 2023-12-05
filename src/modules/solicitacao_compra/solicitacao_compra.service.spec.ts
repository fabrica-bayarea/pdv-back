import { Test, TestingModule } from '@nestjs/testing';
import { SolicitacaoCompraService } from './solicitacao_compra.service';

describe('SolicitacaoCompraService', () => {
  let service: SolicitacaoCompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitacaoCompraService],
    }).compile();

    service = module.get<SolicitacaoCompraService>(SolicitacaoCompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
