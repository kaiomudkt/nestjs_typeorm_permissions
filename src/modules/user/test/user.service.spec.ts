import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userRepositoryMock } from './user.repository.mock';
import { usersEnttitiesList } from './user.schema.list.mock';
import { createuserDtoMock } from './create-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('validar se está definido', () => {
    expect(userService).toBeDefined();
  });

  describe('Cria usuário (user)', () => {
    test('método (create)', async () => {
      const result = await userService.create(createuserDtoMock);
      expect(result).toEqual(usersEnttitiesList[0]);
    });
  });

  describe('Busca muitos usuários (user)', () => {
    test('método (findAll)', async () => {
      const result = await userService.findAll('tenant_1', 0, 99);
      expect(result).toEqual(usersEnttitiesList);
    });
  });

  describe('Busca um usuário (user)', () => {
    test('método (findOne)', async () => {
      const result = await userService.findOne(
        '77001d86-3063-4ae1-9297-81b08e386087',
      );
      expect(result).toEqual(usersEnttitiesList[0]);
    });
  });
});
