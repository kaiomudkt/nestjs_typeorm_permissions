import { Repository } from 'typeorm';
import { UserSchemaTypeormImpl } from '../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { userRepositoryMock } from '../../user/test/user.repository.mock';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { jwtPayloadMockUser1 } from './jwt.payload.mock';
import jwt from 'jsonwebtoken';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  // let userRepository: Repository<UserSchemaTypeormImpl>;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy();
  });

  test('Validar a definição', () => {
    expect(jwtStrategy).toBeDefined();
  });

  // test('checkToken method', () => {
  //   const result = jwtStrategy.verify(jwtStrategy);

  //   expect(result).toEqual(jwtStrategy);
  // });

  test('deve verificar se o token possui assinatura válida', () => {
    const token = '...'; // Token JWT a ser verificado
    const secretOrKey = '...'; // Chave secreta usada para assinar o token

    const options = {
      algorithms: ['HS256'], // Algoritmos de assinatura permitidos
      secretOrKey, // Chave secreta usada para verificar a assinatura
    };

    const jwtPayload = jwt.verify(token, secretOrKey);

    expect(jwtPayload).toBeDefined();
  });

  test('deve verificar se o token possui assinatura válida', () => {
    const token = '...'; // Token JWT a ser verificado
    const secretOrKey = '...'; // Chave secreta usada para assinar o token

    const options = {
      algorithms: ['HS256'], // Algoritmos de assinatura permitidos
      secretOrKey, // Chave secreta usada para verificar a assinatura
    };

    const jwtPayload = jwt.verify(token, secretOrKey);

    expect(jwtPayload).toBeDefined();
  });

  // it('deve ser uma instância de PassportStrategy', () => {
  //   expect(jwtStrategy).toBeInstanceOf(PassportStrategy(Strategy));

  // expect(jwtStrategy instanceof PassportStrategy).toBe(true);

  // expect(Object.getPrototypeOf(jwtStrategy)).toEqual(
  //   Object.getPrototypeOf(PassportStrategy),
  // );
  // });

  // it('deve ter as opções corretas no construtor', () => {
  //   const options = jwtStrategy.getOptions();
  //   expect(options.jwtFromRequest).toEqual(
  //     ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   );
  //   expect(options.ignoreExpiration).toBe(false);
  //   expect(options.secretOrKey).toEqual(process.env.JWT_SECRET);
  // });

  // describe('método checkToken', () => {
  //   const resultAccessToken = authService.validateUser('', '');
  // });

  // it('deve retornar um usuário válido ao validar o payload', async () => {
  //   const userLogged = await jwtStrategy.validate(jwtPayloadMockUser1);
  //   expect(userLogged).toEqual({
  //     id: jwtPayloadMockUser1.sub,
  //     name: jwtPayloadMockUser1.userName,
  //     tenantId: jwtPayloadMockUser1.userTenantId,
  //     email: jwtPayloadMockUser1.userEmail,
  //     status: jwtPayloadMockUser1.userStatus,
  //     isLessorRoot: false,
  //     roles: [],
  //     capabilities: [],
  //     iat: jwtPayloadMockUser1.iat,
  //     exp: jwtPayloadMockUser1.exp,
  //   });
  // });
});
