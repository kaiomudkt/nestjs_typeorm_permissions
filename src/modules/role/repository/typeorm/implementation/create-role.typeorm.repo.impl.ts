import { Injectable } from '@nestjs/common';
import { ICreateRoleRepository } from '../../../domain/interfaces/repository/create-role.repository.interface';
import { RoleSchemaTypeormImpl } from '../role.schema.typeorm.impl';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from '../../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Injectable()
export class CreateRoleTypeormRepoImpl
  implements
    ICreateRoleRepository<RoleSchemaTypeormImpl, TenantSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(RoleSchemaTypeormImpl)
    private readonly roleRepository: Repository<RoleSchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  async findTenantById(
    tenantId: string,
  ): Promise<TenantSchemaTypeormImpl | undefined> {
    const options: FindOneOptions<TenantSchemaTypeormImpl> = {
      where: { id: tenantId },
    };
    return await this.tenantRepository.findOne(options);
  }

  async createRole(
    schema: RoleSchemaTypeormImpl,
  ): Promise<RoleSchemaTypeormImpl> {
    const created: RoleSchemaTypeormImpl = await this.roleRepository.save(
      schema,
    );
    return created;
  }
}
