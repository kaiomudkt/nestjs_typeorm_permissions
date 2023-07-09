import { Injectable } from '@nestjs/common';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
//   constructor(
//     @InjectRepository(UserSchemaTypeormImpl)
//     private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
//   ) {}

  login(username: string, password: string) {
    console.log(username, password);
  }
}
