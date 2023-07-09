import { Injectable } from '@nestjs/common';
import {
  FindAllPayloadRepository,
  IFindAllUsersByTenantRepository,
} from '../../../../domain/interfaces/repository/find-all-users-by-tenant.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllUsersByTenantTypeormRepoImpl
  implements IFindAllUsersByTenantRepository<UserSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async findAllUsersByTenant({
    tenantId,
    page,
    limit,
  }: FindAllPayloadRepository): Promise<[UserSchemaTypeormImpl[], number]> {
    // const skip = (page - 1) * limit; // TODO: testar paginação
    const skip = page;
    const [usersSchema, total] = await this.repository.findAndCount({
      where: { tenantId },
      skip,
      take: limit,
    });
    return [usersSchema, total];
  }
}
