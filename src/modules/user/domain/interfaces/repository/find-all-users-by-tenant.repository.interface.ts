export interface FindAllPayloadRepository {
  page: number;
  limit: number;
  tenantId: string;
}

export interface IFindAllUsersByTenantRepository<T> {
  findAllUsersByTenant(FindAllPayloadRepository): Promise<[T[], number]>;
}
