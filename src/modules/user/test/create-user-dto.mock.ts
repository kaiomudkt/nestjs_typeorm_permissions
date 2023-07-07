import { CreateUserDto } from '../dto/create-user.dto';

export const createuserDtoMock: CreateUserDto = {
  email: 'joao@gmail.com',
  login: 'joao',
  name: 'João Silva',
  password: '123-abc.ABC', // 123-abc.ABC
  birthAt: '1992-12-28',
  subdomain: 'tenancy_1',
};
