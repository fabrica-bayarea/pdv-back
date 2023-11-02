import { Test, TestingModule } from '@nestjs/testing';
import { NotaFiscalEntradaService } from './nota-fiscal-entrada.service';

describe('NotaFiscalEntradaService', () => {
  let service: NotaFiscalEntradaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaFiscalEntradaService],
    }).compile();

    service = module.get<NotaFiscalEntradaService>(NotaFiscalEntradaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
