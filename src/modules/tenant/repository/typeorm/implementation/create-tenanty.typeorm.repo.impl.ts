import { Injectable } from '@nestjs/common';
import { ICreateTenantRepository } from '../../../domain/interfaces/repository/create-tenant.repository.interface';
import { TenantSchemaTypeormImpl } from '../tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateTenantTypeormRepoImpl
  implements ICreateTenantRepository<TenantSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly repository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  async create(
    schema: TenantSchemaTypeormImpl,
  ): Promise<TenantSchemaTypeormImpl> {
    const created = await this.repository.save(schema);
    return created;
  }
}
