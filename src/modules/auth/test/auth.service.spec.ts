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
import { accessToken } from './access-token.mock';
import { jwtPayloadMockUser1 } from './jwt.payload.mock';
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
  });

  describe('token', () => {
    test('método createToken', async () => {
      const resultAccessToken: { access_token: string } =
        await authService.login(jwtPayloadMockUser1);
      expect(resultAccessToken.access_token).toEqual({
        access_token: accessToken,
      });
    });
  });

  // describe('método checkToken', () => {
  //   const resultAccessToken = authService.validateUser('', '');
  // });
});
