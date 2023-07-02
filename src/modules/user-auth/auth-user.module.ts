import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
