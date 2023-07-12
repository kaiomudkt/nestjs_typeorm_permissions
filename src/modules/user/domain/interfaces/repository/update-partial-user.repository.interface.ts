export interface IUpdatePartialUserRepository<UserSchema, UserSchemaPartial> {
  updatePartial: (id: string, schema: UserSchemaPartial) => Promise<UserSchema>;
}
