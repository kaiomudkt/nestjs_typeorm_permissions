export interface IFindByIdUserRepository<T> {
  findById(id: string): Promise<T | undefined>;
}
