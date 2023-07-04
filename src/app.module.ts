import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
// import { mongooseConfig } from './infra/outsourced-service/db/mongoose/data-source';
import { dataSouceOptions } from './infra/gateways/internal/db/typeorm/data-source';
import { UserModule } from './modules/user/user.module';
import { MultitenancyModule } from './modules/multitenancy/multitenancy.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    // MongooseModule.forRootAsync({
    //   useFactory: () => mongooseConfig,
    // }),
    UserModule,
    MultitenancyModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
