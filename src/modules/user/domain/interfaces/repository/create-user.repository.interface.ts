export interface ICreateUserRepository<UserSchema, TenantSchema> {
  create(schema: UserSchema): Promise<UserSchema>;

  findTenantById(tenantId: string): Promise<TenantSchema | undefined>;

  findUserById(userId: string): Promise<UserSchema | undefined>;

  isEmailPerTenantOrUsernameDuplicated: (
    tenantId: string,
    email: string,
    username: string,
  ) => Promise<boolean>;
}
