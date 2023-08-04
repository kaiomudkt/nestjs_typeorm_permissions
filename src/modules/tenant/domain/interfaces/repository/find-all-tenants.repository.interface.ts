export interface FindAllPayloadRepository {
  page: number;
  limit: number;
}

export interface IFindAllTenantsRepository<TenantSchema> {
  findAllTenants(FindAllPayloadRepository): Promise<[TenantSchema[], number]>;
}
