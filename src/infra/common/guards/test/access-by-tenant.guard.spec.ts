import { AccessByTenantGuard } from './access-by-tenant.guard';

describe('AccessByTenantGuard', () => {
  it('should be defined', () => {
    expect(new AccessByTenantGuard()).toBeDefined();
  });
});
