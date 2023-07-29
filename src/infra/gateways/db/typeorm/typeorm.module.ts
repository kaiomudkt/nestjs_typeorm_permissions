import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../../../modules/user/user.module';
import { UserSchemaTypeormImpl } from '../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { TypeormSeeder } from './typeorm.seeder';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    forwardRef(() => UserModule),
    /** configura typeorm para este modulo */
    TypeOrmModule.forFeature([UserSchemaTypeormImpl]),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => dataSourceOptions,
    // }),
  ],
  controllers: [],
  providers: [TypeormSeeder],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
