import { Injectable } from '@nestjs/common';
import { ICreateUserRepository } from 'src/modules/user/domain/repository-interfaces/create-user.repository.interface';
import { UserSchema } from '../user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserRepoImpl implements ICreateUserRepository<UserSchema> {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async create(schema: UserSchema): Promise<UserSchema> {
    return await this.repository.save(schema);
  }
}
