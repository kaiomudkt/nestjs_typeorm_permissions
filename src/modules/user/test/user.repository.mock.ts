import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { usersEnttitiesList } from './user.schema.list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserSchemaTypeormImpl),
  useValue: {
    save: jest.fn().mockResolvedValue(usersEnttitiesList[0]),
    findAndCount: jest.fn().mockResolvedValue(usersEnttitiesList),
    findOneBy: jest.fn().mockResolvedValue(usersEnttitiesList[0]),
    isEmailPerTenantOrLoginDuplicated: jest.fn().mockResolvedValue(false),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
};
