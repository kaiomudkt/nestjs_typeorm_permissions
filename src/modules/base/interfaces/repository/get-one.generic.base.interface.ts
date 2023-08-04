export abstract class IGetOneGenericRepository<T> {
  abstract getOne(id: string): Promise<T>;
}
