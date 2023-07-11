export interface ICreateTenantRepository<T> {
  create(schema: T): Promise<T>;
}
