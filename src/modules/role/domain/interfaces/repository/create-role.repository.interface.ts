export interface ICreateRoleRepository<TenantSchema> {
  create(schema: TenantSchema): Promise<TenantSchema>;
}
