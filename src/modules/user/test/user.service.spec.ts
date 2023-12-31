import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userRepositoryMock } from './user.repository.mock';
import { userLogged1, usersEnttitiesList } from './user.schema.list.mock';
import { createuserDtoMock } from './create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdatePartialUserDto } from '../dto/update-partial-user.dto';
import { TenantSchemaTypeormImpl } from '../../tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { tenantRepositoryMock } from '../../tenant/test/tenant.repository.mock';
import { tenant1Entity } from '../../tenant/test/tenant.schema.list.mock';
import { UserLogged } from '../../base/interfaces/dto/user-logged.interface';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserSchemaTypeormImpl>;
  let tenantRepository: Repository<TenantSchemaTypeormImpl>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock, tenantRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserSchemaTypeormImpl));
    tenantRepository = module.get(getRepositoryToken(TenantSchemaTypeormImpl));
  });

  it('validar se está definido', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Cria usuário (user)', () => {
    test('método (create)', async () => {
      // jest
      //   .spyOn(userRepository, 'isEmailPerTenantOrUsernameDuplicated')
      //   .mockResolvedValueOnce(true);
      const userLoggedReq: UserLogged = userLogged1;
      const result = await userService.create(createuserDtoMock, userLoggedReq);
      expect(result).toEqual(usersEnttitiesList[1]);
    });
  });

  describe('Busca muitos usuários (user)', () => {
    test('método (findAll)', async () => {
      const result = await userService.findAll(
        usersEnttitiesList[1].tenant.id,
        0,
        99,
      );
      expect(result).toEqual([usersEnttitiesList, usersEnttitiesList.length]);
    });
  });

  describe('Busca um usuário (user)', () => {
    test('método (findOne)', async () => {
      const result = await userService.findOne(
        '77001d86-3063-4ae1-9297-81b08e386087',
        userLogged1,
      );
      expect(result).toEqual(usersEnttitiesList[1]);
    });
  });

  describe('Atualiza partes de um usuário (user)', () => {
    test('método (update partial)', async () => {
      const result = await userService.updatePartial(
        '77001d86-3063-4ae1-9297-81b08e386087',
        UpdatePartialUserDto,
        userLogged1,
      );
      expect(result).toEqual(usersEnttitiesList[1]);
    });
  });

  describe('Deleta um usuário (user)', () => {
    test('método (delete user by id)', async () => {
      const userId = '77001d86-3063-4ae1-9297-81b08e386087'; // ID do usuário a ser excluído
      // await userService.remove(userId);

      // Espione o método softDelete do repositório
      const softDeleteSpy = jest.spyOn(userRepository, 'softDelete');
      await userService.remove(userId);
      expect(softDeleteSpy).toHaveBeenCalledWith(userId);
    });
  });
});
