import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';

describe('TenantController', () => {
  let controller: TenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [TenantService],
    }).compile();

    controller = module.get<TenantController>(TenantController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
