export interface IFindByIdTenantRepository<T> {
  findById(id: string): Promise<T | undefined>;
}
