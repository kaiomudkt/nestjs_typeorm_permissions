import { Injectable } from '@nestjs/common';
import { IUpdatePartialUserRepository } from '../../../../domain/repository/interfaces/update-partial-user.repository.interface';
import { UserSchemaTypeormImpl } from '../schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdatePartialUserTypeormRepoImpl
  implements IUpdatePartialUserRepository<UserSchemaTypeormImpl>
{
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly repository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async updatePartial(
    id: string,
    schema: UserSchemaTypeormImpl,
  ): Promise<UserSchemaTypeormImpl> {
    const { affected } = await this.repository.update(id, schema);
    if (affected < 1) {
      // TODO: lançar exceção: Erro ao atualizar usuário
      return;
    }
    const updatedUser = await this.repository.findOneBy(<any>{ id });
    return updatedUser;
  }
}
