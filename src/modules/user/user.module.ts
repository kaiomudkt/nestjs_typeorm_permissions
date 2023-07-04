import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './repository/typeorm/user.schema';
import { CreateUserRepoImpl } from './repository/typeorm/implementation/create-user.repo.impl';
import { FindByIdUserRepoImpl } from './repository/typeorm/implementation/find-by-id-user.repo.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [UserService, CreateUserRepoImpl, FindByIdUserRepoImpl],
})
export class UserModule {}
