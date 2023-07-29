import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
// import { mongooseConfig } from './infra/outsourced-service/db/mongoose/data-source';
import { dataSourceOptions } from './infra/gateways/db/typeorm/data-source';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeormModule } from './infra/gateways/db/typeorm/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // MongooseModule.forRootAsync({
    //   useFactory: () => mongooseConfig,
    // }),
    UserModule,
    AuthModule,
    RoleModule,
    TenantModule,
    CategoryModule,
    TypeormModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
