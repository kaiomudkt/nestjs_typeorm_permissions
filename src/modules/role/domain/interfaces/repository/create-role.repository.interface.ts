export interface ICreateRoleRepository<T> {
  create(schema: T): Promise<T>;
}
