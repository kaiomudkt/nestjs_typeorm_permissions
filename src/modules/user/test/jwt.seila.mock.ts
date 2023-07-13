import { JwtService } from '@nestjs/jwt';

export const jwtSeilaMock = {
  provider: JwtService,
  useValue: {
    sing: jest.fn(),
    verify: jest.fn(),
  },
};
