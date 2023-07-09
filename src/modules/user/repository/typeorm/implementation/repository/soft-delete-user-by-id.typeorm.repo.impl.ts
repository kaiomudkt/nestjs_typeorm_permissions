import { Injectable } from '@nestjs/common';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISoftDeleteUserByIdRepository } from '../../../../domain/repository/interfaces/soft-delete-user-by-id.repository.interface';

@Injectable()
export class SoftDeleteByIdUserTypeormRepoImpl
  implements ISoftDeleteUserByIdRepository<UserSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async softDeleteById(id: string): Promise<void> {
    // await this.repository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .from(UserSchemaTypeormImpl)
    //   .where('id = :id', { id })
    //   .execute();
    await this.repository.softDelete(id);
  }
}
