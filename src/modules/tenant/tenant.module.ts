import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from './repository/typeorm/tenant.schema.typeorm.impl';

@Module({
  imports: [TypeOrmModule.forFeature([TenantSchemaTypeormImpl])],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
