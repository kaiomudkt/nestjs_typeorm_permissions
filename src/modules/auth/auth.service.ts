import { Injectable } from '@nestjs/common';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
  ) {}

  async login(username: string, password: string) {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { username },
    };
    const user = await this.userRepositoryInstance.findOne(options);
    console.log(user);
  }
}
