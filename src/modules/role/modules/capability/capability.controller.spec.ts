import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityController } from './capability.controller';
import { CapabilityService } from './capability.service';

describe('CapabilityController', () => {
  let controller: CapabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapabilityController],
      providers: [CapabilityService],
    }).compile();

    controller = module.get<CapabilityController>(CapabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
