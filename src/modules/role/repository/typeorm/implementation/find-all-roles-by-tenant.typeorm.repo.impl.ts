import { Injectable } from '@nestjs/common';
import {
  FindAllRolesPayloadRepository,
  IFindAllRolesByTenantRepository,
} from '../../../domain/interfaces/repository/find-all-roles-by.repository.interface';
import { RoleSchemaTypeormImpl } from '../role.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllRolesByTenantTypeormRepoImpl
  implements IFindAllRolesByTenantRepository<RoleSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(RoleSchemaTypeormImpl)
    private readonly repository: Repository<RoleSchemaTypeormImpl>,
  ) {}

  async findAllRolesByTenant({
    tenantId,
    page,
    limit,
  }: FindAllRolesPayloadRepository): Promise<
    [RoleSchemaTypeormImpl[], number]
  > {
    const skip = page;
    const [rolesSchema, total] = await this.repository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.tenant', 'tenant')
      .leftJoinAndSelect('role.createdBy', 'createdBy')
      .where('role.tenantId = :tenantId', { tenantId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return [rolesSchema, total];
  }
}
