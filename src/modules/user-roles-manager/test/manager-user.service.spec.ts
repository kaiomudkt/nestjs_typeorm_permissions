import { Test, TestingModule } from '@nestjs/testing';
import { ManagerUserService } from '../manager-user.service';

describe('ManagerUserService', () => {
  let service: ManagerUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerUserService],
    }).compile();

    service = module.get<ManagerUserService>(ManagerUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
