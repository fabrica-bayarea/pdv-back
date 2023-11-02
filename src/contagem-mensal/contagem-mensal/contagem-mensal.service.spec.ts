import { Test, TestingModule } from '@nestjs/testing';
import { ContagemMensalService } from './contagem-mensal.service';

describe('ContagemMensalService', () => {
  let service: ContagemMensalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContagemMensalService],
    }).compile();

    service = module.get<ContagemMensalService>(ContagemMensalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
