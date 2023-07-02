import { Module } from '@nestjs/common';
import { ManagerUserController } from './manager-user.controller';
import { ManagerUserService } from './manager-user.service';

@Module({
  controllers: [ManagerUserController],
  providers: [ManagerUserService]
})
export class ManagerUserModule {}
