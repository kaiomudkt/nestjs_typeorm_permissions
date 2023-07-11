import { IFindAllUsersByTenantRepository } from '../interfaces/repository/find-all-users-by-tenant.repository.interface';
import { UserEntity } from '../user.entity';
import { IUserSchema } from '../user.schema.interface';

export class FindAllUsersByTenantUsecase {
  private repository: IFindAllUsersByTenantRepository<IUserSchema>;
  constructor(repository: IFindAllUsersByTenantRepository<IUserSchema>) {
    this.repository = repository;
  }

  async findAllUsersByTenant(
    tenantId: string,
    page = 0,
    limit = 50,
  ): Promise<[IUserSchema[], number]> {
    // const userEntity = UserEntity.factoryWithId(id);
    const data = await this.repository.findAllUsersByTenant({
      tenantId,
      page,
      limit,
    });
    return data;
  }
}
