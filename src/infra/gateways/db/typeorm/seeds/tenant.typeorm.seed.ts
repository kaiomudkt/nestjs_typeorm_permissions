import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';

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
    const tenantsInDatabase: TenantSchemaTypeormImpl[] =
      await this.tenantRepository.find();
    console.log('tenantsInDatabase.length:::', tenantsInDatabase.length);
    if (tenantsInDatabase.length < 1) {
      const tenantsEntitiesSchemas: Partial<TenantSchemaTypeormImpl>[] = [
        {
          id: '9339b84e-4d36-4333-9fb9-8c916bc8d408',
          name: 'LESSOR_ROOT',
          description:
            'locatario: tenant é para funcionarios adminstrativo do sistema',
          email: 'tenant1@example.com',
          foundationDateAt: new Date('2023-01-02'),
          superAdmin: usersInDatabase[0],
          createdBy: usersInDatabase[0],
          status: 'ACTIVE',
        },
        {
          id: 'a6853d24-9454-46ab-96a9-912f598810d1',
          name: 'Tenant 1',
          description: 'descricao do tenant',
          email: 'tenant1@example.com',
          foundationDateAt: new Date('2023-01-02'),
          superAdmin: usersInDatabase[0],
          createdBy: usersInDatabase[0],
          status: 'ACTIVE',
        },
        {
          id: '6495dd14-7194-43fd-96dd-b28b351692d9',
          name: 'Tenant 2',
          description: 'descricao do tenant',
          email: 'tenant2@example.com',
          foundationDateAt: new Date('2023-02-02'),
          superAdmin: usersInDatabase[0],
          createdBy: usersInDatabase[0],
          status: 'ACTIVE',
        },
      ];
      await this.tenantRepository.save(tenantsEntitiesSchemas);
    } else {
      console.log(
        'SEEDs de tenant não foram executadas por ja existir registros',
      );
    }
  }
}
