export interface ICreateTenantRepository<TenantSchema> {
  create(schema: TenantSchema): Promise<TenantSchema>;
}
