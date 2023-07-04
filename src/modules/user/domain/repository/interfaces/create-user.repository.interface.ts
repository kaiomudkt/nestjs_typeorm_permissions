export interface ICreateUserRepository<T> {
  create: (schema: T) => Promise<T>;
}
