import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { userRepositoryMock } from '../../user/test/user.repository.mock';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserSchemaTypeormImpl } from '../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtServiceMock } from './jwt.service.mock';
import { user1Entity } from '../../user/test/user.schema.list.mock';
import { UserLogged } from '../../base/interfaces/dto/user-logged.interface';
import { UnauthorizedException } from '@nestjs/common';
// import { jwtServiceMock } from './jwt.service.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<UserSchemaTypeormImpl>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        // JwtService,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    // userRepository = moduleRef.get(getRepositoryToken(UserSchemaTypeormImpl));
    userRepository = moduleRef.get<Repository<UserSchemaTypeormImpl>>(
      getRepositoryToken(UserSchemaTypeormImpl),
    );
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('authService deve estar definido', async () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
    // const username = user1Entity.username;
    // const password = user1Entity.password;
    // const userPayload = {
    //   sub: user1Entity.id,
    //   userName: user1Entity.name,
    //   userTenantId: user1Entity.tenant ? user1Entity.tenant.id : null,
    //   userEmail: user1Entity.email,
    //   userStatus: user1Entity.status,
    // };
    // const token = await authService.login(userPayload);
    // expect(jwtService.sign).toHaveBeenCalledWith(userPayload);
    // expect(token).toBe('token123!@#');
  });

  it('deve gerar um token JWT ao fazer login com sucesso', async () => {
    // Mock do usuário e payload
    const userPayload = {
      username: user1Entity.username,
      password: user1Entity.password,
    };
    const user: UserLogged = {
      id: user1Entity.id,
      // username: user1Entity.username,
      // password: user1Entity.password,
      email: user1Entity.email,
      isLessorRoot: false,
      name: user1Entity.name,
      status: user1Entity.status,
      tenantId: '757851a7-259d-4e69-ad16-8bf44137e564',
      // tenantId: user1Entity.tenant.id,
      capabilities: [],
      roles: [],
    };

    // Mock do serviço de geração de token
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    // Mock do repositório de usuário
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user1Entity);

    // Chama o método de login do AuthService
    const result = await authService.login(userPayload);

    // Verifica se o token foi gerado corretamente
    expect(jwtService.signAsync).toHaveBeenCalledWith(userPayload);
    expect(result).toEqual({ access_token: 'token' });
  });
});
