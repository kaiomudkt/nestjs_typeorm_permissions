import { Test, TestingModule } from '@nestjs/testing';
import { MultitenancyController } from './multitenancy.controller';
import { MultitenancyService } from './multitenancy.service';

describe('MultitenancyController', () => {
  let controller: MultitenancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultitenancyController],
      providers: [MultitenancyService],
    }).compile();

    controller = module.get<MultitenancyController>(MultitenancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
