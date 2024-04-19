import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoService } from './carrinho.service';

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrinhoService],
    }).compile();

    service = module.get<CarrinhoService>(CarrinhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
