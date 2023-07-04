export abstract class IDeleteGenericRepository<T> {
  abstract delete(id: string): Promise<T>;
}
