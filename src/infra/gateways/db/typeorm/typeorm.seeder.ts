// import { Factory, Seeder } from 'typeorm-seeding';
// import { createConnection } from 'typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { UserSchemaTypeormImpl } from '../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { UserTypeormSeed } from './seeds/user.typeorm.seed';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TenantSchemaTypeormImpl } from '../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { TenantTypeormSeed } from './seeds/tenant.typeorm.seed';
import { UserTenantRelationshipSeed } from './seeds/user-tenant-relationship.typeorm.seed';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly connection: Connection, // @InjectRepository(UserSchemaTypeormImpl) // private readonly userRepository: Repository<UserSchemaTypeormImpl>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.runSeeds();
    } catch (error) {
      console.error('Erro ao executar as SEEDs:', error);
    }
  }

  async runSeeds() {
    await this.connection.transaction(async (entityManager: EntityManager) => {
      const userRepository: Repository<UserSchemaTypeormImpl> =
        entityManager.getRepository(UserSchemaTypeormImpl);
      const userSeed = new UserTypeormSeed(userRepository);
      await userSeed.run();
      const tenantRepository: Repository<TenantSchemaTypeormImpl> =
        entityManager.getRepository(TenantSchemaTypeormImpl);
      const tenantSeed = new TenantTypeormSeed(
        tenantRepository,
        userRepository,
      );
      await tenantSeed.run();
      // const userTenantRelationshipSeed = new UserTenantRelationshipSeed(
      //   userRepository,
      //   tenantRepository,
      // );
      // await userTenantRelationshipSeed.run();
    });
  }
}
