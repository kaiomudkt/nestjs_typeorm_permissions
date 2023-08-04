import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from './repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { StatusUserValidator } from './repository/typeorm/implementation/StatusUser.validator';
import { TenantSchemaTypeormImpl } from '../tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchemaTypeormImpl, TenantSchemaTypeormImpl]),
    TenantModule,
  ],
  controllers: [UserController],
  providers: [StatusUserValidator, UserService],
})
export class UserModule {}
