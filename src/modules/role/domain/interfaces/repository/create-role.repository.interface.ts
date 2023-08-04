export interface ICreateRoleRepository<RoleSchema, TenantSchema> {
  createRole(schema: RoleSchema): Promise<RoleSchema>;
  findTenantById(tenantId: string): Promise<TenantSchema>;
}
