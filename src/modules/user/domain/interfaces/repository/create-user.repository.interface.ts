export interface ICreateUserRepository<UserSchema, TenantSchema> {
  create(schema: UserSchema): Promise<UserSchema>;

  findTenantById(id: string): Promise<TenantSchema | undefined>;

  isEmailPerTenantOrUsernameDuplicated: (
    tenantId: string,
    email: string,
    username: string,
  ) => Promise<boolean>;
}
