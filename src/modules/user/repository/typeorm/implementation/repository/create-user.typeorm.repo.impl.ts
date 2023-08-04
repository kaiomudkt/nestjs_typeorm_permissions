import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from '../../../../domain/interfaces/repository/create-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from '../../../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Injectable()
export class CreateUserTypeormRepoImpl
  implements
    ICreateUserRepository<UserSchemaTypeormImpl, TenantSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepository: Repository<UserSchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  async findUserById(
    userId: string,
  ): Promise<UserSchemaTypeormImpl | undefined> {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { id: userId },
    };
    const userSchema = await this.userRepository.findOne(options);
    return userSchema;
  }

  async findTenantById(
    tenantId: string,
  ): Promise<TenantSchemaTypeormImpl | undefined> {
    const options: FindOneOptions<TenantSchemaTypeormImpl> = {
      where: { id: tenantId },
    };
    const tenantSchema = await this.tenantRepository.findOne(options);
    return tenantSchema;
  }

  async create(schema: UserSchemaTypeormImpl): Promise<UserSchemaTypeormImpl> {
    const createdUser = await this.userRepository.save(schema);
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
    const queryBuilder = this.userRepository
      .createQueryBuilder()
      .select()
      .from(UserSchemaTypeormImpl, 'user')
      .where('(user.tenantId = :tenantId and user.email = :email)', {
        tenantId,
        email,
      })
      .orWhere('user.username = :username', { username });

    const sql = queryBuilder.getSql();
    const duplicateUser = queryBuilder.getOne();
    return !!duplicateUser;
  }
}
