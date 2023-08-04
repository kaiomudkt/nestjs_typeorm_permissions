import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from '../repository/typeorm/tenant.schema.typeorm.impl';
import { tenantsEnttitiesList } from './tenant.schema.list.mock';

export const tenantRepositoryMock = {
  provide: getRepositoryToken(TenantSchemaTypeormImpl),
  useValue: {
    save: jest.fn().mockResolvedValue(tenantsEnttitiesList[0]),
    findAndCount: jest.fn().mockResolvedValue(tenantsEnttitiesList),
    findOneBy: jest.fn().mockResolvedValue(tenantsEnttitiesList[0]),
    findOne: jest.fn().mockResolvedValue(tenantsEnttitiesList[0]),
    // isEmailPerTenantOrUsernameDuplicated: jest.fn().mockResolvedValue(false),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
};
