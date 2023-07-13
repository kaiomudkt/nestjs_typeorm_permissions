import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { userRepositoryMock } from '../../user/test/user.repository.mock';
import { JwtModule } from '@nestjs/jwt';
import { jwtSeilaMock } from '../../user/test/jwt.seila.mock';

describe.skip('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        JwtModule,
        // jwtSeilaMock
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
