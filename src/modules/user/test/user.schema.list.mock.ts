import { UserSchemaTypeormImpl } from '../repository/typeorm/implementation/schema/user.schema.typeorm.impl';

export const usersEnttitiesList: UserSchemaTypeormImpl[] = [
  {
    id: '77001d86-3063-4ae1-9297-81b08e386087',
    email: 'joao@gmail.com',
    username: 'joao',
    name: 'João Silva',
    password: '123-abc.ABC', // 123-abc.ABC
    birthAt: new Date('1992-12-28'),
    tenantId: 'tenant_1',
    status: 'PENDING',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'fd1d42b6-d8ae-41d6-ae36-75f62c54502d',
    email: 'maria@gmail.com',
    username: 'maria',
    name: 'Maria Oliveira',
    password: '123-abc.ABC', // 123-abc.ABC
    birthAt: new Date('2001-11-27'),
    tenantId: 'tenant_1',
    status: 'ACTIVE',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
