import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [UserRoleModule],
})
export class RoleModule {}
