import { Test, TestingModule } from '@nestjs/testing';
import { ItemCarrinhoService } from './item-carrinho.service';

describe('ItemCarrinhoService', () => {
  let service: ItemCarrinhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCarrinhoService],
    }).compile();

    service = module.get<ItemCarrinhoService>(ItemCarrinhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
