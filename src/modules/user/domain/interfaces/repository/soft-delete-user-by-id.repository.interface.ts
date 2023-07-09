export interface ISoftDeleteUserByIdRepository<T> {
  softDeleteById(id: string): Promise<void>;
}
