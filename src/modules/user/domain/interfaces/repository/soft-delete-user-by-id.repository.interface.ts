export interface ISoftDeleteUserByIdRepository<UserSchema> {
  softDeleteById(id: string): Promise<void>;
}
