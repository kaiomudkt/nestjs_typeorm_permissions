import { IFindAllUsersByTenantRepository } from '../repository/interfaces/find-all-users-by-tenant.repository.interface';
import { UserEntity } from '../user.entity';
import { IUserSchema } from '../user.schema.interface';

export class FindAllUsersByTenantUsecase {
  repository: IFindAllUsersByTenantRepository<IUserSchema>;
  constructor(repository: IFindAllUsersByTenantRepository<IUserSchema>) {
    this.repository = repository;
  }

  async findAllUsersByTenant(
    tenantId: string,
    page: number,
    limit: number,
  ): Promise<[IUserSchema[], number]> {
    console.log('findAllUsersByTenantxxx:', {
      tenantId,
      page,
      limit,
    });
    // const userEntity = UserEntity.factoryWithId(id);
    const data = await this.repository.findAllUsersByTenant({
      tenantId,
      page,
      limit,
    });
    return data;
  }
}
