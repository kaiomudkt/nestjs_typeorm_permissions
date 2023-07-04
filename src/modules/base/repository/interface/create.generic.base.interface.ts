export abstract class ICreateGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
}
