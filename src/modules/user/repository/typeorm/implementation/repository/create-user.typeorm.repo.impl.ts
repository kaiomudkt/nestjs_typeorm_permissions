import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from '../../../../domain/repository/interfaces/create-user.repository.interface';
import { UserTypeOrmSchemaImpl } from '../schema/user.typeorm.schema.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserTypeormRepoImpl
  implements ICreateUserRepository<UserTypeOrmSchemaImpl>
{
  constructor(
    @InjectRepository(UserTypeOrmSchemaImpl)
    private readonly repository: Repository<UserTypeOrmSchemaImpl>,
  ) {}

  async create(schema: UserTypeOrmSchemaImpl): Promise<UserTypeOrmSchemaImpl> {
    return await this.repository.save(schema);
  }
}
