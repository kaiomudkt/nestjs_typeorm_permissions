import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    // Aqui você pode definir os métodos do JwtService que serão usados nos testes
    // e retornar os valores esperados
    sign: jest.fn().mockReturnValue('token123!@#'), // Add the sign method
    signAsync: jest.fn().mockResolvedValue('token123!@#'),
    verify: jest
      .fn()
      .mockReturnValue({ userId: '77001d86-3063-4ae1-9297-81b08e386087' }),
  },
};
