import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { CapabilityModule } from './capability/capability.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [CapabilityModule]
})
export class RoleModule {}
