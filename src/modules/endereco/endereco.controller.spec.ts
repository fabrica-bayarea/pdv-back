import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';

describe('EnderecoController', () => {
  let controller: EnderecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
      providers: [EnderecoService],
    }).compile();

    controller = module.get<EnderecoController>(EnderecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
