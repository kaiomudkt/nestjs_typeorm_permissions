import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { tenantRepositoryMock } from './tenant.repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from '../repository/typeorm/tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';

describe('TenantService', () => {
  // let service: TenantService;
  let tenantRepository: Repository<TenantSchemaTypeormImpl>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantService, tenantRepositoryMock],
    }).compile();

    // service = module.get<TenantService>(TenantService);
    tenantRepository = module.get(getRepositoryToken(TenantSchemaTypeormImpl));
  });

  it.skip('should be defined', () => {
    expect(tenantRepository).toBeDefined();
  });
});
