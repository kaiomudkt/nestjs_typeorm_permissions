export interface ICreateUserRepository<T> {
  create: (schema: T) => Promise<T>;

  isEmailPerTenantOrLoginDuplicated: (
    tenantId: string,
    email: string,
    login: string,
  ) => Promise<boolean>;
}
