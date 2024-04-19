import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoService } from './carrinho.service';

describe('CarrinhoController', () => {
  let controller: CarrinhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoController],
      providers: [CarrinhoService],
    }).compile();

    controller = module.get<CarrinhoController>(CarrinhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
