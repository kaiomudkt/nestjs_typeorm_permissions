import { Injectable } from '@nestjs/common';
import { ICreateRoleRepository } from '../../../domain/interfaces/repository/create-role.repository.interface';
import { RoleSchemaTypeormImpl } from '../role.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateRoleTypeormRepoImpl
  implements ICreateRoleRepository<RoleSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(RoleSchemaTypeormImpl)
    private readonly repository: Repository<RoleSchemaTypeormImpl>,
  ) {}

  async create(schema: RoleSchemaTypeormImpl): Promise<RoleSchemaTypeormImpl> {
    const created = await this.repository.save(schema);
    return created;
  }
}
