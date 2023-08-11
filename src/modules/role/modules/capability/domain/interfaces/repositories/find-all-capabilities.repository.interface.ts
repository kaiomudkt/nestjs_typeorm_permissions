export interface FindAllPayloadRepository {
  page: number;
  limit: number;
  tenantId: string;
}

export interface IFindAllCapabilitiesByTenantRepository<CapabilitySchema> {
  findAllCapabilityByTenant(
    FindAllPayloadRepository,
  ): Promise<[CapabilitySchema[], number]>;
}
