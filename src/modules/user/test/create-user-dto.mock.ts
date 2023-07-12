import { tenant1Entity } from '../../tenant/test/tenant.schema.list.mock';
import { CreateUserDto } from '../dto/create-user.dto';

export const createuserDtoMock: CreateUserDto = {
  email: 'joao@gmail.com',
  username: 'joao',
  name: 'João Silva',
  password: '123-abc.ABC',
  birthAt: '1992-12-28',
  // tenantId: tenant1Entity.id,
};
