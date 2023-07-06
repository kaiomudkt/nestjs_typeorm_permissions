import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from '../../../../../user/domain/repository/interfaces/create-user.repository.interface';
import { TenantTypeOrmSchemaImpl } from '../schema/tenant.typeorm.schema.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateTenantTypeormRepoImpl
  implements ICreateUserRepository<TenantTypeOrmSchemaImpl>
{
  constructor(
    @InjectRepository(TenantTypeOrmSchemaImpl)
    private readonly repository: Repository<TenantTypeOrmSchemaImpl>,
  ) {}

  async create(
    schema: TenantTypeOrmSchemaImpl,
  ): Promise<TenantTypeOrmSchemaImpl> {
    return await this.repository.save(schema);
  }
}
