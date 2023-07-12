import { Injectable } from '@nestjs/common';
import { IUpdatePartialUserRepository } from '../../../../domain/interfaces/repository/update-partial-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdatePartialUserTypeormRepoImpl
  implements
    IUpdatePartialUserRepository<
      UserSchemaTypeormImpl,
      Partial<UserSchemaTypeormImpl>
    >
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async updatePartial(
    id: string,
    schema: UserSchemaTypeormImpl,
  ): Promise<UserSchemaTypeormImpl> {
    await this.repository.update(id, schema);
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { id },
      // relations: ['tenant', 'createdBy'],
    };
    const updatedUser = await this.repository.findOne(options);
    return updatedUser;
  }

  async findUserById(id: string): Promise<UserSchemaTypeormImpl | undefined> {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { id },
      relations: ['tenant'],
    };
    return await this.repository.findOne(options);
  }
}
