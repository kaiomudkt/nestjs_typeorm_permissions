import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<UserSchemaTypeormImpl | null> {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { username },
    };
    const userSchema = await this.userRepositoryInstance.findOne(options);
    if (!userSchema) {
      // TODO: throw new Error('Login ou senha errado');
      return null;
    }
    const isPasswordValid = compareSync(password, userSchema.password);
    if (!isPasswordValid) {
      // TODO: throw new Error('Login ou senha errado');
      return null;
    }
    return userSchema;
  }
}
