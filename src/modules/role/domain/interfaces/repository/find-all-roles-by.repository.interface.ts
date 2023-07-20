export interface FindAllRolesPayloadRepository {
  page?: number;
  limit?: number;
  tenantId: string;
}

export interface IFindAllRolesByTenantRepository<Rolechema> {
  findAllRolesByTenant(
    FindAllPayloadRepository: FindAllRolesPayloadRepository,
  ): Promise<[Rolechema[], number]>;
}
