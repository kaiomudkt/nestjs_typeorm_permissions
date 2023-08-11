import { Module } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { CapabilityController } from './capability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchemaTypeormImpl } from '../../repository/typeorm/role.schema.typeorm.impl';
import { TenantSchemaTypeormImpl } from '../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';
// import { PermissionModule } from '../permission/permission.module';
import { UserSchemaTypeormImpl } from '../../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSchemaTypeormImpl,
      RoleSchemaTypeormImpl,
      TenantSchemaTypeormImpl,
    ]),
    // CapabilityModule,
    // PermissionModule,
    // TenantModule,
  ],
  controllers: [CapabilityController],
  providers: [CapabilityService],
})
export class CapabilityModule {}
