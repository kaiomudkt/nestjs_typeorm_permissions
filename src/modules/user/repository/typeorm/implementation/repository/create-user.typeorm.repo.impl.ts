import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from '../../../../domain/repository/interfaces/create-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserTypeormRepoImpl
  implements ICreateUserRepository<UserSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async create(schema: UserSchemaTypeormImpl): Promise<UserSchemaTypeormImpl> {
    return await this.repository.save(schema);
  }
}
