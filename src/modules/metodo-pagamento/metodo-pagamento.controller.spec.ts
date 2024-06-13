import { Test, TestingModule } from '@nestjs/testing';
import { MetodoPagamentoController } from './metodo-pagamento.controller';
import { MetodoPagamentoService } from './metodo-pagamento.service';

describe('MetodoPagamentoController', () => {
  let controller: MetodoPagamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetodoPagamentoController],
      providers: [MetodoPagamentoService],
    }).compile();

    controller = module.get<MetodoPagamentoController>(MetodoPagamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
