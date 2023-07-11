export interface FindAllPayloadRepository {
  page: number;
  limit: number;
}

export interface IFindAllTenantsRepository<T> {
  findAllTenants(FindAllPayloadRepository): Promise<[T[], number]>;
}
