import { Injectable } from '@nestjs/common';
import { IFindByIdUserRepository } from '../../../../domain/repository/interfaces/find-by-id-user.repository.interface';
import { UserTypeOrmSchemaImpl } from '../schema/user.typeorm.schema.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByIdUserTypeormRepoImpl
  implements IFindByIdUserRepository<UserTypeOrmSchemaImpl>
{
  constructor(
    @InjectRepository(UserTypeOrmSchemaImpl)
    private readonly repository: Repository<UserTypeOrmSchemaImpl>,
  ) {}

  async findById(id: string): Promise<UserTypeOrmSchemaImpl | undefined> {
    return await this.repository.findOneBy(<any>{ id });
  }
}
