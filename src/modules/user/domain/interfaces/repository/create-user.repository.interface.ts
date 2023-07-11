export interface ICreateUserRepository<T_User, T_Tenant> {
  create(schema: T_User): Promise<T_User>;

  findTenantById(id: string): Promise<T_Tenant | undefined>;

  isEmailPerTenantOrUsernameDuplicated: (
    tenantId: string,
    email: string,
    username: string,
  ) => Promise<boolean>;
}
