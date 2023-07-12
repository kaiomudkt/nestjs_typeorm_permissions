import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { usersEnttitiesList } from './user.schema.list.mock';
import { tenantsEnttitiesList } from '../../tenant/test/tenant.schema.list.mock';

const createQueryBuilderMock = jest.fn(() => ({
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  getManyAndCount: jest
    .fn()
    .mockResolvedValue([usersEnttitiesList, usersEnttitiesList.length]),
}));

export const userRepositoryMock = {
  provide: getRepositoryToken(UserSchemaTypeormImpl),
  useValue: {
    save: jest.fn().mockResolvedValue(usersEnttitiesList[1]),
    findAll: jest.fn().mockResolvedValue(usersEnttitiesList),
    findAndCount: jest
      .fn()
      .mockResolvedValue([usersEnttitiesList, usersEnttitiesList.length]),
    findAllUsersByTenant: jest.fn().mockResolvedValue(usersEnttitiesList),
    isEmailPerTenantOrUsernameDuplicated: jest.fn().mockResolvedValue(false),
    findTenantById: jest.fn().mockResolvedValue(tenantsEnttitiesList[0]),
    findUserById: jest.fn().mockResolvedValue(usersEnttitiesList[1]),
    findOne: jest.fn().mockResolvedValue(usersEnttitiesList[1]),
    findOneBy: jest.fn().mockResolvedValue(usersEnttitiesList[1]),
    update: jest.fn(),
    createQueryBuilder: createQueryBuilderMock,
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
};
