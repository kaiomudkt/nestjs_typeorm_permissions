import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from '../../../../domain/interfaces/repository/create-user.repository.interface';
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
    const createdUser = await this.repository.save(schema);
    return createdUser;
  }

  /**
   * (ou email repete por tenant)
   * (ou username repete)
   * @param tenantId string
   * @param email string
   * @param username string
   * @returns Promise<boolean>
   */
  async isEmailPerTenantOrUsernameDuplicated(
    tenantId: string,
    email: string,
    username: string,
  ): Promise<boolean> {
    const queryBuilder = this.repository
      .createQueryBuilder()
      .select()
      .from(UserSchemaTypeormImpl, 'user')
      .where('(user.tenantId = :tenantId and user.email = :email)', {
        tenantId,
        email,
      })
      .orWhere('user.username = :username', { username });

    const sql = queryBuilder.getSql();
    // console.log(sql);
    const duplicateUser = queryBuilder.getOne();
    return !!duplicateUser;
  }
}
