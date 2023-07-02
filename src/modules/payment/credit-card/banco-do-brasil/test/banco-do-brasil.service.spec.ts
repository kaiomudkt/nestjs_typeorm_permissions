import { Test, TestingModule } from '@nestjs/testing';
import { BancoDoBrasilService } from './banco-do-brasil.service';

describe('BancoDoBrasilService', () => {
  let service: BancoDoBrasilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BancoDoBrasilService],
    }).compile();

    service = module.get<BancoDoBrasilService>(BancoDoBrasilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
