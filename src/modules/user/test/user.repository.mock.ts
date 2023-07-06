import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserSchemaTypeormImpl),
  useValue: {
    save: jest.fn(),
    findOneBy: jest.fn(),
  },
};
