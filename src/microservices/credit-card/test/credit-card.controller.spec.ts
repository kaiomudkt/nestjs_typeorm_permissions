import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardController } from './credit-card.controller';

describe('CreditCardController', () => {
  let controller: CreditCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardController],
    }).compile();

    controller = module.get<CreditCardController>(CreditCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
