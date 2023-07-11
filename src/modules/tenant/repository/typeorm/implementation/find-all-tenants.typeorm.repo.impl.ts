import { Injectable } from '@nestjs/common';
import {
  IFindAllTenantsRepository,
  FindAllPayloadRepository,
} from '../../../domain/interfaces/repository/find-all-tenants.repository.interface';
import { TenantSchemaTypeormImpl } from '../tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllTenantsTypeormRepoImpl
  implements IFindAllTenantsRepository<TenantSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly repository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  async findAllTenants({
    page,
    limit,
  }: FindAllPayloadRepository): Promise<[TenantSchemaTypeormImpl[], number]> {
    // TODO const skip = (page - 1) * limit; // TODO: testar paginação
    const skip = page;
    const [tenantsSchema, total] = await this.repository.findAndCount({
      skip,
      take: limit,
    });
    return [tenantsSchema, total];
  }
}
