import { MultitenancyGuard } from './multitenancy.guard';

describe('MultitenancyGuard', () => {
  it('should be defined', () => {
    expect(new MultitenancyGuard()).toBeDefined();
  });
});
