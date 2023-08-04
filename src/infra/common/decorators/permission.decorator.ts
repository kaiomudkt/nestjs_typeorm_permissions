import { SetMetadata } from '@nestjs/common';

// export const FIXED_ROLE_LABELS = {
//   root: 'SYSTEM_ROOT_USER',
//   admin: 'TENANT ADMIN USER',
//   default: 'TENANT_DEFAULT_USER',
// };
//   createUserByTenant: 'CREATE_USER_PER_TENANT',
//   readAll: 'GET_ALL_SYSTEM_USERS',
//   readAllByTenant: 'GET_ALL_USERS_PER_TENANT',
//   updateUserByTenant: 'UPDATE USER REGISTER BY TENANT',
//   delete: 'DELETE_USER_',

/**
 * para cada funcionalidade do modulo 'user'
 * deve ser criado uma 'capacidade'
 * com prefixo do modulo/submodulos para evitar conflito nos nomes
 */
export const USER_CAPABILITIES = {
  user_create: 'USER_CREATE',
  user_findAll: 'USER_FIND_ALL',
  user_findOne: 'USER_FIND_ONE',
  user_updatePartial: 'USER_UPDATE_PARTIAL',
  user_delete: 'USER_DELETE',
};

export const ALL_SYSTEM_CAPACITIES = {
  ...USER_CAPABILITIES,
};

export const NAME_DECORATOR = 'permission';
/**
 * este decorator é usado pelo src/infra/common/guards/permission.guard.ts
 */
export const Permission = (requiredCapabilities: string[]) =>
  SetMetadata(NAME_DECORATOR, requiredCapabilities);
