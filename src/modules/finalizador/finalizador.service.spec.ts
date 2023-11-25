import { Test, TestingModule } from '@nestjs/testing';
import { FinalizadorService } from './finalizador.service';

describe('FinalizadorService', () => {
  let service: FinalizadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinalizadorService],
    }).compile();

    service = module.get<FinalizadorService>(FinalizadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
