import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmSchemaImpl } from './repository/typeorm/implementation/schema/user.typeorm.schema.impl';
import { CreateUserRepoImpl } from './repository/typeorm/implementation/create-user.repo.impl';
import { FindByIdUserRepoImpl } from './repository/typeorm/implementation/find-by-id-user.repo.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmSchemaImpl])],
  controllers: [UserController],
  providers: [UserService, CreateUserRepoImpl, FindByIdUserRepoImpl],
})
export class UserModule {}
