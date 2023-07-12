export interface IUpdatePartialUserRepository<UserSchema, UserSchemaPartial> {
  updatePartial: (
    userId: string,
    schema: UserSchemaPartial,
  ) => Promise<UserSchema>;
  findUserById(userId: string): Promise<UserSchema | undefined>;
}
