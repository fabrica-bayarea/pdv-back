import { Test, TestingModule } from '@nestjs/testing';
import { FichaTecnicaController } from './ficha-tecnica.controller';

describe('FichaTecnicaController', () => {
  let controller: FichaTecnicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaTecnicaController],
    }).compile();

    controller = module.get<FichaTecnicaController>(FichaTecnicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
