import { Test, TestingModule } from '@nestjs/testing';
import { BancoDoBrasilController } from './banco-do-brasil.controller';

describe('BancoDoBrasilController', () => {
  let controller: BancoDoBrasilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancoDoBrasilController],
    }).compile();

    controller = module.get<BancoDoBrasilController>(BancoDoBrasilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
