import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { CapabilityModule } from './capability/capability.module';
import { RoleSchemaTypeormImpl } from './repository/typeorm/role.schema.typeorm.impl';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CapabilityModule,
    TypeOrmModule.forFeature([RoleSchemaTypeormImpl]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
