export interface IBaseRepository<T> {
  create: (schema: T) => Promise<T>;
  findById(id: string): Promise<T | undefined>;
}
