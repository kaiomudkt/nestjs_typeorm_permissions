import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from './repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { CreateUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/create-user.typeorm.repo.impl';
import { FindByIdUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/find-by-id-user.typeorm.repo.impl';
import { StatusUserValidator } from './repository/typeorm/implementation/StatusUser.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchemaTypeormImpl])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserTypeormRepoImpl,
    FindByIdUserTypeormRepoImpl,
    StatusUserValidator,
  ],
})
export class UserModule {}
