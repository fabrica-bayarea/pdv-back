import { Test, TestingModule } from '@nestjs/testing';
import { DescontoService } from './desconto.service';

describe('DescontoService', () => {
  let service: DescontoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescontoService],
    }).compile();

    service = module.get<DescontoService>(DescontoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
