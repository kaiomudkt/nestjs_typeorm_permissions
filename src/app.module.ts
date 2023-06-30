import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './infra/db/mongoose/data-source';
import { dataSouceOptions } from './infra/db/typeorm/data-source';
import { ManagerModule } from './modules/manager/manager.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    // MongooseModule.forRootAsync({
    //   useFactory: () => mongooseConfig,
    // }),
    UserModule,
    AuthModule,
    RoleModule,
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
