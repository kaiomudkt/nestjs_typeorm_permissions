import { Injectable } from '@nestjs/common';
import { IFindByIdUserRepository } from 'src/modules/user/domain/repository-interfaces/find-by-id-user.repository.interface';
import { UserSchema } from '../user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByIdUserRepoImpl
  implements IFindByIdUserRepository<UserSchema>
{
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async findById(id: string): Promise<UserSchema | undefined> {
    return await this.repository.findOneBy(<any>{ id });
  }
}
