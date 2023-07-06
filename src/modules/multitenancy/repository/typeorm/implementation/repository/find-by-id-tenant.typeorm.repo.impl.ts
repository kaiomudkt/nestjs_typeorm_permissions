import { Injectable } from '@nestjs/common';
import { IFindByIdUserRepository } from 'src/modules/user/domain/repository/interfaces/find-by-id-user.repository.interface';
import { TenantTypeOrmSchemaImpl } from '../schema/tenant.typeorm.schema.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByIdTenantTypeormRepoImpl
  implements IFindByIdUserRepository<TenantTypeOrmSchemaImpl>
{
  constructor(
    @InjectRepository(TenantTypeOrmSchemaImpl)
    private readonly repository: Repository<TenantTypeOrmSchemaImpl>,
  ) {}

  async findById(id: string): Promise<TenantTypeOrmSchemaImpl | undefined> {
    return await this.repository.findOneBy(<any>{ id });
  }
}
