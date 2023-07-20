import { UnauthorizedException } from '@nestjs/common';
import { FindAllRolesPayloadRepository, IFindAllRolesByTenantRepository } from '../interfaces/repository/find-all-roles-by.repository.interface';
import { IRoleSchema } from '../role.schema.interface';

export class FindAllRolesByTenantUsecase {
  private repository: IFindAllRolesByTenantRepository<IRoleSchema>;
  constructor(repository: IFindAllRolesByTenantRepository<IRoleSchema>) {
    this.repository = repository;
  }

  async findAllRolesByTenant({
    tenantId,
    page = 0,
    limit = 50,
  }: FindAllRolesPayloadRepository): Promise<[IRoleSchema[], number]> {
    if (!tenantId) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const data = await this.repository.findAllRolesByTenant({
      tenantId,
      page,
      limit,
    });
    return data;
  }
}
