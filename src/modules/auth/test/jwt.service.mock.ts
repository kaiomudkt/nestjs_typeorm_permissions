import { JwtService } from '@nestjs/jwt';
import { accessToken } from './access-token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    // Aqui você pode definir os métodos do JwtService que serão usados nos testes
    // e retornar os valores esperados
    sign: jest.fn().mockReturnValue({
      access_token: accessToken,
    }),
    signAsync: jest.fn().mockResolvedValue({
      access_token: accessToken,
    }),
    verify: jest
      .fn()
      .mockReturnValue({ userId: '77001d86-3063-4ae1-9297-81b08e386087' }),
  },
};
