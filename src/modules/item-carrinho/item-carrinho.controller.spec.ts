import { Test, TestingModule } from '@nestjs/testing';
import { ItemCarrinhoController } from './item-carrinho.controller';
import { ItemCarrinhoService } from './item-carrinho.service';

describe('ItemCarrinhoController', () => {
  let controller: ItemCarrinhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCarrinhoController],
      providers: [ItemCarrinhoService],
    }).compile();

    controller = module.get<ItemCarrinhoController>(ItemCarrinhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
