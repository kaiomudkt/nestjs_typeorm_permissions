export interface ICreateUserRepository<T> {
  create(schema: T): Promise<T>;

  findTenantById(id: string): Promise<T | undefined>;

  isEmailPerTenantOrUsernameDuplicated: (
    tenantId: string,
    email: string,
    username: string,
  ) => Promise<boolean>;
}
