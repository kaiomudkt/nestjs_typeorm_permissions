import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
// import { mongooseConfig } from './infra/outsourced-service/db/mongoose/data-source';
import { dataSouceOptions } from './infra/gateways/db/typeorm/data-source';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    // MongooseModule.forRootAsync({
    //   useFactory: () => mongooseConfig,
    // }),
    UserModule,
    AuthModule,
    RoleModule,
    TenantModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
