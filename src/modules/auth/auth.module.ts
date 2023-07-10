import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from '../../infra/common/guards/jwt-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
/**
 * https://docs.nestjs.com/security/authentication
 */
@Module({
  imports: [
    /** variaveis de ambiente */
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forFeature([UserSchemaTypeormImpl]),
    PassportModule,
    // PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      privateKey: process.env.JWT_SECRET || '123456',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      // vinculará automaticamente AuthGuarda global todos os endpoints do sistema
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
