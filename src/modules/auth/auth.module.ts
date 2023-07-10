import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';

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
    // {
    //   // vinculará automaticamente AuthGuarda todos os endpoints
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AuthModule {}
