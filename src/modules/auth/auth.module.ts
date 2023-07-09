import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
// import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
// import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserSchemaTypeormImpl]),
    ConfigModule.forRoot(), 
    // UserSchemaTypeormImpl
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // LocalStrategy, JwtStrategy
  ],
})
export class AuthModule {}
