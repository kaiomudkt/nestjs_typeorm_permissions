import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './infra/outsourced-service/db/mongoose/data-source';
import { dataSouceOptions } from './infra/outsourced-service/db/typeorm/data-source';
import { ManagerUserModule } from './modules/user-roles-manager/manager-user.module';
import { AuthUserModule } from './modules/user-auth/auth-user.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/role/user-role/user-role.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PaymentModule } from './modules/payment/payment.module';
import { BancoDoBrasilController } from './payment/credit-card/banco-do-brasil/banco-do-brasil.controller';
import { BancoDoBrasilService } from './payment/credit-card/banco-do-brasil/banco-do-brasil.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    // MongooseModule.forRootAsync({
    //   useFactory: () => mongooseConfig,
    // }),
    UserModule,
    ManagerUserModule,
    AuthUserModule,
    RoleModule,
    UserRoleModule,
    PaymentModule,
  ],
  controllers: [AppController, BancoDoBrasilController],
  providers: [BancoDoBrasilService],
})
export class AppModule {
  constructor() {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }
}
