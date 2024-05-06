import { Test, TestingModule } from '@nestjs/testing';
import { DescontoController } from './desconto.controller';
import { DescontoService } from './desconto.service';

describe('DescontoController', () => {
  let controller: DescontoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescontoController],
      providers: [DescontoService],
    }).compile();

    controller = module.get<DescontoController>(DescontoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
