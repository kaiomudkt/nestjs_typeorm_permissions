import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Injectable()
export class UserTenantRelationshipSeed {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepository: Repository<UserSchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  public async run() {
    const usersInDatabase: UserSchemaTypeormImpl[] =
      await this.userRepository.find();
    const tenantsInDatabase: TenantSchemaTypeormImpl[] =
      await this.tenantRepository.find({ relations: ['superAdmin'] });
    console.log('usersInDatabase:::', usersInDatabase);
    console.log('tenantsInDatabase:::', tenantsInDatabase);
    if (usersInDatabase.length > 0 && tenantsInDatabase.length > 0) {
      for (const user of usersInDatabase) {
        // const matchingTenant: TenantSchemaTypeormImpl = tenantsInDatabase.find(
        //   (tenant: TenantSchemaTypeormImpl): boolean =>
        //     tenant.superAdminId === user.id,
        // );
        // console.log('matchingTenant:::', matchingTenant);
        // if (matchingTenant) {
        // TODO: user.tenantId = matchingTenant.id;
        // user.tenantId = '83eadcee-dbfa-4a5d-bb8d-b1f755246906';
        const options: FindOneOptions<TenantSchemaTypeormImpl> = {
          where: { id: '83eadcee-dbfa-4a5d-bb8d-b1f755246906' },
          relations: ['tenant'],
        };
        const tenantSchema: TenantSchemaTypeormImpl =
          await this.tenantRepository.findOne(options);
        user.tenant = tenantSchema;
        const result: UserSchemaTypeormImpl = await this.userRepository.save(
          user,
        );
        console.log('result:::', result);
        // }
        const usersInDatabase22: UserSchemaTypeormImpl[] =
          await this.userRepository.find({ relations: ['tenant'] });
        console.log('usersInDatabase22:::', usersInDatabase22);
      }
    } else {
      console.log('ERRO UserTenantRelationshipSeed');
    }
  }
}
