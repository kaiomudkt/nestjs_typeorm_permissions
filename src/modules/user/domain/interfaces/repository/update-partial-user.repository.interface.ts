export interface IUpdatePartialUserRepository<UserSchema> {
  updatePartial: (id: string, schema: UserSchema) => Promise<UserSchema>;
}
