import { tenant1Entity } from '../../tenant/test/tenant.schema.list.mock';
import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';

export const rootEntity: UserSchemaTypeormImpl = {
  id: '77001d86-3063-4ae1-9297-81b08e386087',
  email: 'root@gmail.com',
  username: 'root',
  name: 'Root System',
  password: '123-abc.ABC',
  birthAt: new Date('1899-01-01'),
  status: 'ACTIVE',
  deletedAt: null,
  createdAt: new Date('2023-07-12T02:04:26.708Z'),
  updatedAt: new Date('2023-07-12T02:04:26.708Z'),
  createdBy: null,
  tenant: null,
};

export const user1Entity: UserSchemaTypeormImpl = {
  id: '77001d86-3063-4ae1-9297-81b08e386087',
  email: 'joao@gmail.com',
  username: 'joao',
  name: 'João Silva',
  password: '123-abc.ABC', // 123-abc.ABC
  birthAt: new Date('1992-12-28'),
  status: 'PENDING',
  deletedAt: null,
  createdAt: new Date('2023-07-12T02:04:26.708Z'),
  updatedAt: new Date('2023-07-12T02:04:26.708Z'),
  createdBy: rootEntity,
  tenant: tenant1Entity,
};

export const user2Entity: UserSchemaTypeormImpl = {
  id: 'fd1d42b6-d8ae-41d6-ae36-75f62c54502d',
  email: 'maria@gmail.com',
  username: 'maria',
  name: 'Maria Oliveira',
  password: '123-abc.ABC', // 123-abc.ABC
  birthAt: new Date('2001-11-27'),
  status: 'ACTIVE',
  deletedAt: null,
  createdAt: new Date('2023-07-12T02:04:26.708Z'),
  updatedAt: new Date('2023-07-12T02:04:26.708Z'),
  createdBy: user1Entity,
  tenant: tenant1Entity,
};

export const usersEnttitiesList: UserSchemaTypeormImpl[] = [
  rootEntity,
  user1Entity,
  user2Entity,
];
