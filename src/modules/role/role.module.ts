import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSchemaTypeormImpl } from './repository/typeorm/role.schema.typeorm.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './modules/permission/permission.module';
import { CapabilityModule } from './modules/capability/capability.module';
import { TenantModule } from '../tenant/tenant.module';
import { TenantSchemaTypeormImpl } from '../tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Module({
  imports: [
    CapabilityModule,
    TypeOrmModule.forFeature([RoleSchemaTypeormImpl, TenantSchemaTypeormImpl]),
    PermissionModule,
    // TenantModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
