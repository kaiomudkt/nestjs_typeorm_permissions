import { usersEnttitiesList } from '../../user/test/user.schema.list.mock';
import { CreateTenantDto } from '../dto/create-tenant.dto';

export const createTenantDtoMock: CreateTenantDto = {
  name: 'Hyper Comper Brilhante',
  description: 'Qualidade acessivel para a brilhante',
  email: 'comper.brilhante@gmail.com',
  status: 'ACTIVE',
  superAdminId: usersEnttitiesList[0].id,
  createdById: usersEnttitiesList[0].id,
  foundationDateAt: new Date(''),
};
