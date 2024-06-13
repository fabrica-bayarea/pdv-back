import { Test, TestingModule } from '@nestjs/testing';
import { MetodoPagamentoService } from './metodo-pagamento.service';

describe('MetodoPagamentoService', () => {
  let service: MetodoPagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetodoPagamentoService],
    }).compile();

    service = module.get<MetodoPagamentoService>(MetodoPagamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
