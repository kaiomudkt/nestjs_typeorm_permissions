import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityService } from './capability.service';

describe('CapabilityService', () => {
  let service: CapabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapabilityService],
    }).compile();

    service = module.get<CapabilityService>(CapabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
