export interface ICreateUserRepository<T> {
  create: (schema: T) => Promise<T>;

  isEmailPerTenantOrUsernameDuplicated: (
    tenantId: string,
    email: string,
    username: string,
  ) => Promise<boolean>;
}
