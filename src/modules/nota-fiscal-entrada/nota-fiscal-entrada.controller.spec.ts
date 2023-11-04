import { Test, TestingModule } from '@nestjs/testing';
import { NotaFiscalEntradaController } from './nota-fiscal-entrada.controller';

describe('NotaFiscalEntradaController', () => {
  let controller: NotaFiscalEntradaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaFiscalEntradaController],
    }).compile();

    controller = module.get<NotaFiscalEntradaController>(NotaFiscalEntradaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
