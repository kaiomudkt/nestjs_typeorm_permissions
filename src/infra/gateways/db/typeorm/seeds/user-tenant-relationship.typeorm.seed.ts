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
    // console.log('usersInDatabase:::', usersInDatabase);
    // console.log('tenantsInDatabase:::', tenantsInDatabase);
    if (usersInDatabase.length > 0 && tenantsInDatabase.length > 0) {
      for (const user of usersInDatabase) {
        const matchingTenant: TenantSchemaTypeormImpl = tenantsInDatabase.find(
          (tenant: TenantSchemaTypeormImpl): boolean =>
            tenant.superAdmin.id === user.id,
        );
        // console.log('matchingTenant:::', matchingTenant);
        if (matchingTenant) {
          user.tenant = matchingTenant;
          const result = await this.userRepository.save(user);
          // console.log('result:::', result);
        }
        const usersInDatabase22: UserSchemaTypeormImpl[] =
          await this.userRepository.find({ relations: ['tenant'] });
        // console.log('usersInDatabase22:::', usersInDatabase22);
      }
    } else {
      console.log('ERRO UserTenantRelationshipSeed');
    }
  }
}
