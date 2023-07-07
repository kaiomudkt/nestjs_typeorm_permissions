import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { usersEnttitiesList } from './user.schema.list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserSchemaTypeormImpl),
  useValue: {
    save: jest.fn().mockResolvedValue(usersEnttitiesList[0]),
    findOneBy: jest.fn(),
  },
};
