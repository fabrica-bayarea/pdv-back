import { Test, TestingModule } from '@nestjs/testing';
import { ItensService } from './items.service';

describe('ItensService', () => {
  let service: ItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItensService],
    }).compile();

    service = module.get<ItensService>(ItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
