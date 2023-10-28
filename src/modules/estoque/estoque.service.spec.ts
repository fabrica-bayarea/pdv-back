import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueService } from './estoque.service';

describe('EstoqueService', () => {
  let service: EstoqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstoqueService],
    }).compile();

    service = module.get<EstoqueService>(EstoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
