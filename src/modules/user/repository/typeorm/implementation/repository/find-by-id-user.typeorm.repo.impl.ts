import { Injectable } from '@nestjs/common';
import { IFindByIdUserRepository } from '../../../../domain/interfaces/repository/find-by-id-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { FindOneOptions, Repository } from 'typeorm';
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
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { id },
      relations: ['tenant', 'createdBy'],
    };
    return await this.repository.findOne(options);
  }
}
