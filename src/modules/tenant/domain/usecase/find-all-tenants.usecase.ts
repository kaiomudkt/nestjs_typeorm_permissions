import { IFindAllTenantsRepository } from '../interfaces/repository/find-all-tenants.repository.interface';
import { TenantEntity } from '../tenant.entity';
import { ITenantSchema } from '../tenant.schema.interface';

export class FindAllTenantsUsecase {
  private repository: IFindAllTenantsRepository<ITenantSchema>;
  constructor(repository: IFindAllTenantsRepository<ITenantSchema>) {
    this.repository = repository;
  }

  async findAllTenants(
    page = 0,
    limit = 50,
  ): Promise<[ITenantSchema[], number]> {
    // const tenantEntity = TenantEntity.factoryWithId(id);
    const data = await this.repository.findAllTenants({
      page,
      limit,
    });
    return data;
  }
}
