import { CreateTenantDto } from '../../dto/create-tenant.dto';
import { ICreateTenantRepository } from '../interfaces/repository/create-tenant.repository.interface';
import { TenantEntity } from '../tenant.entity';
import { ITenantSchema } from '../tenant.schema.interface';

export class CreateTenantUsecase {
  private repository: ICreateTenantRepository<ITenantSchema>;
  constructor(repository: ICreateTenantRepository<ITenantSchema>) {
    this.repository = repository;
  }

  async create(data: CreateTenantDto) {
    // const tenantEntity = TenantEntity.factoryNewTenant();

    const tenantEntity = {
      name: data.name,
      description: data.description,
      status: data.status, // TODO:  getEnumKeyByValue(StatusTenantEnum, tenantEntity.status),
      email: data.email,
      foundationDateAt: data.foundationDateAt,
      createdById: data.createdById,
      superAdmin: null, // TODO:
      createdBy: null, // TODO:
    };
    const created = await this.repository.create(tenantEntity);
    return created;
  }
}
