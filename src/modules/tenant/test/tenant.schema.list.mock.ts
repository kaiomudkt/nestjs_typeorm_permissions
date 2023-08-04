import {
  rootEntity,
  user1Entity,
  usersEnttitiesList,
} from '../../user/test/user.schema.list.mock';
import { TenantSchemaTypeormImpl } from '../repository/typeorm/tenant.schema.typeorm.impl';

export const tenantMasterEntity: TenantSchemaTypeormImpl = {
  id: '43408355-86cd-424a-848c-347f3279af87',
  name: 'tenant master',
  description: 'tenant do user root',
  email: 'root@gmail.com',
  status: 'ACTIVE',
  superAdmin: rootEntity,
  createdBy: rootEntity,
  foundationDateAt: new Date('1999/01/25'),
  users: [],
};

export const tenant1Entity: TenantSchemaTypeormImpl = {
  id: '757851a7-259d-4e69-ad16-8bf44137e564',
  name: 'Hyper Comper Brilhante',
  description: 'Qualidade acessivel para a brilhante',
  email: 'comper.brilhante@gmail.com',
  status: 'ACTIVE',
  superAdmin: rootEntity,
  createdBy: rootEntity,
  foundationDateAt: new Date('1950/01/25'),
  users: [],
};

export const tenantsEnttitiesList: TenantSchemaTypeormImpl[] = [
  tenant1Entity,
  {
    id: '757851a7-259d-4e69-ad16-8bf44137e564',
    name: 'Comper da Mato Grosso',
    description: 'Qualidade acessivel para a Av. Mato Grosso',
    email: 'comper.matogrosso@gmail.com',
    status: 'ACTIVE',
    superAdmin: user1Entity,
    createdBy: user1Entity,
    foundationDateAt: new Date('2000/06/19'),
    users: [],
  },
];
