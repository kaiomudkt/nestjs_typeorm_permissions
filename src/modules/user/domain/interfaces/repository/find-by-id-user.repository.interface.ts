export interface IFindByIdUserRepository<UserSchema> {
  findById(id: string): Promise<UserSchema | undefined>;
}
