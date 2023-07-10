import { Module, Provider, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../infra/common/guards/jwt-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from '../../infra/common/guards/local-auth.guard';

const DEFAULT_AUTH = {
  AUTH_DEFAUT_JWT_NESTJS_ALL_ENDPOINTS: 'AUTH_DEFAUT_JWT_NESTJS_ALL_ENDPOINTS',
  AUTH_DEFAUT_ONLY_ON_DECORATED_ENDPOINTS:
    'AUTH_DEFAUT_ONLY_ON_DECORATED_ENDPOINTS',
  AUTH_DEFAUT_JWT_KEYCLOCK_ALL_ENDPOINTS:
    'AUTH_DEFAUT_JWT_KEYCLOCK_ALL_ENDPOINTS',
  AUTH_DEFAUT_JWT_KEYCLOCK_ONLY_ON_DECORATED_ENDPOINTS:
    'AUTH_DEFAUT_JWT_KEYCLOCK_ONLY_ON_DECORATED_ENDPOINTS',
};

/**
 * https://docs.nestjs.com/security/authentication
 */
@Module({
  imports: [
    /** variaveis de ambiente */
    ConfigModule.forRoot(),
    // UserModule,
    forwardRef(() => UserModule),
    /** configura typeorm para este modulo */
    TypeOrmModule.forFeature([UserSchemaTypeormImpl]),
    PassportModule,
    // PassportModule.register({ session: true }),
    JwtModule.register({
      /** não precisamos importar o JwtModuleem nenhum outro lugar em nosso aplicativo. */
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
    JwtAuthGuard,
    LocalAuthGuard,
    {
      provide: APP_GUARD,
      /**
       * ou use "useFactory" ou use:
       * useClass: JwtAuthGuard
       */
      useFactory: (jwtAuthGuard: JwtAuthGuard) => {
        const defaultAuthType =
          process.env.BACKEND_DEFAULT_AUTHENTICATION_TYPE ||
          DEFAULT_AUTH['AUTH_DEFAUT_JWT_NESTJS_ALL_ENDPOINTS'];
        if (
          defaultAuthType ===
          DEFAULT_AUTH['AUTH_DEFAUT_JWT_NESTJS_ALL_ENDPOINTS']
        ) {
          /** Aplica o AuthGuard globalmente */
          return jwtAuthGuard;
        } else if (
          defaultAuthType ===
          DEFAULT_AUTH['AUTH_DEFAUT_ONLY_ON_DECORATED_ENDPOINTS']
        ) {
          /** Não aplica o AuthGuard globalmente
           * em controllers como exemplo: getProfile(@Request() req)
           * o campos @Request() req.user fica vazio
           */
          return null;
        } else {
          return jwtAuthGuard;
        }
      },
      inject: [JwtAuthGuard],
    },
  ],
})
export class AuthModule {}
