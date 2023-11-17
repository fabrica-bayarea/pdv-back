import { Test, TestingModule } from '@nestjs/testing';
import { ItensController } from './items.controller';

describe('ItensController', () => {
  let controller: ItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItensController],
    }).compile();

    controller = module.get<ItensController>(ItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
