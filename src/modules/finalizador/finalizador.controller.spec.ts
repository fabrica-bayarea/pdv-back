import { Test, TestingModule } from '@nestjs/testing';
import { FinalizadorController } from './finalizador.controller';
import { FinalizadorService } from './finalizador.service';

describe('FinalizadorController', () => {
  let controller: FinalizadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinalizadorController],
      providers: [FinalizadorService],
    }).compile();

    controller = module.get<FinalizadorController>(FinalizadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
