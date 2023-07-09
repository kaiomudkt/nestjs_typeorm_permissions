export interface IUpdatePartialUserRepository<T> {
  updatePartial: (id: string, schema: T) => Promise<T>;
}
