export interface FindAllPayloadRepository {
  page: number;
  limit: number;
  tenantId: string;
}

export interface IFindAllUsersByTenantRepository<UserSchema> {
  findAllUsersByTenant(
    FindAllPayloadRepository,
  ): Promise<[UserSchema[], number]>;
}
