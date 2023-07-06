import { Test, TestingModule } from '@nestjs/testing';
import { MultitenancyService } from '../multitenancy.service';

describe('MultitenancyService', () => {
  let service: MultitenancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultitenancyService],
    }).compile();

    service = module.get<MultitenancyService>(MultitenancyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
