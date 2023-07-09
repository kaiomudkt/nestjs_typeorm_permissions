import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from './repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { StatusUserValidator } from './repository/typeorm/implementation/StatusUser.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchemaTypeormImpl])],
  controllers: [UserController],
  providers: [StatusUserValidator, UserService],
  // exports: [UserSchemaTypeormImpl],
})
export class UserModule {}
