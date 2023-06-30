import { Test, TestingModule } from '@nestjs/testing';
import { ManagerUserController } from './manager-user.controller';

describe('ManagerUserController', () => {
  let controller: ManagerUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerUserController],
    }).compile();

    controller = module.get<ManagerUserController>(ManagerUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
