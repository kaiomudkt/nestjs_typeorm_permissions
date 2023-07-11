export abstract class IGetAllGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
}
