export interface ICreateCapabilityRepository<CapabilitySchema, TenantSchema> {
  create(schema: CapabilitySchema): Promise<CapabilitySchema>;

  findTenantById(tenantId: string): Promise<TenantSchema | undefined>;

  findCapabilitySchemaById(
    capabilityId: string,
  ): Promise<CapabilitySchema | undefined>;
}
