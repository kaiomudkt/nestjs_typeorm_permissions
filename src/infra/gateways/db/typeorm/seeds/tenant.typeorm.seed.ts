import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { createTenantFakeData } from '../factories/tenant.factory.typeorm';

@Injectable()
export class TenantTypeormSeed {
  constructor(
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepository: Repository<UserSchemaTypeormImpl>,
  ) {}

  public async run() {
    const usersInDatabase: UserSchemaTypeormImpl[] =
      await this.userRepository.find();
    let userRoot = null;
    let user1 = null;
    let user2 = null;
    for (const user of usersInDatabase) {
      if (user.id === '55de4944-8f8e-4a30-a4ec-1afad3ffa924') {
        userRoot = user;
      }
      if (user.id === '83eadcee-dbfa-4a5d-bb8d-b1f755246906') {
        user1 = user;
      }
      if (user.id === '4c7a37e6-60c3-47bb-898a-124279e71778') {
        user2 = user;
      }
    }
    const tenantsInDatabase: TenantSchemaTypeormImpl[] =
      await this.tenantRepository.find();
    const tenantsFactory: Partial<TenantSchemaTypeormImpl>[] = [];
    for (let i = 0; i < 10; i++) {
      tenantsFactory.push(await createTenantFakeData(this.userRepository));
    }
    if (tenantsInDatabase.length < 1) {
      const tenantsEntitiesSchemas: Partial<TenantSchemaTypeormImpl>[] = [
        {
          id: '9339b84e-4d36-4333-9fb9-8c916bc8d408',
          name: 'LESSOR_ROOT',
          description:
            'locatario: tenant é para funcionarios adminstrativo do sistema',
          email: 'tenant1@example.com',
          foundationDateAt: new Date('2023-01-02'),
          superAdmin: userRoot,
          createdBy: userRoot,
          status: 'ACTIVE',
        },
        {
          id: 'a6853d24-9454-46ab-96a9-912f598810d1',
          name: 'Tenant 1',
          description: 'descricao do tenant',
          email: 'tenant1@example.com',
          foundationDateAt: new Date('2023-01-02'),
          superAdmin: user1,
          createdBy: userRoot,
          status: 'ACTIVE',
        },
        {
          id: '6495dd14-7194-43fd-96dd-b28b351692d9',
          name: 'Tenant 2',
          description: 'descricao do tenant',
          email: 'tenant2@example.com',
          foundationDateAt: new Date('2023-02-02'),
          superAdmin: user2,
          createdBy: userRoot,
          status: 'ACTIVE',
        },
        ...tenantsFactory,
      ];
      await this.tenantRepository.save(tenantsEntitiesSchemas);
    } else {
      console.log(
        'SEEDs de tenant não foram executadas por ja existir registros',
      );
    }
  }
}
