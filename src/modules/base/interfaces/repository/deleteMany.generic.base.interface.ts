export abstract class IDeleteManyGenericRepository<T> {
  abstract deleteMany(ids: string[]): Promise<T[]>;
}
