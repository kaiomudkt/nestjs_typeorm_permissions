export abstract class IGetOneGenericRepository<T> {
  abstract update(id: string, item: T);
}
