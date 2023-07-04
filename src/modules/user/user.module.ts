import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmSchemaImpl } from './repository/typeorm/implementation/schema/user.typeorm.schema.impl';
import { CreateUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/create-user.typeorm.repo.impl';
import { FindByIdUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/find-by-id-user.typeorm.repo.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmSchemaImpl])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserTypeormRepoImpl,
    FindByIdUserTypeormRepoImpl,
  ],
})
export class UserModule {}
