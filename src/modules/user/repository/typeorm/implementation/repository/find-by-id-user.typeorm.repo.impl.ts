import { Injectable } from '@nestjs/common';
import { IFindByIdUserRepository } from '../../../../domain/repository/interfaces/find-by-id-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByIdUserTypeormRepoImpl
  implements IFindByIdUserRepository<UserSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async findById(id: string): Promise<UserSchemaTypeormImpl | undefined> {
    return await this.repository.findOneBy(<any>{ id });
  }
}
