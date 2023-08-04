import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { RoleSchemaTypeormImpl } from '../../../../../modules/role/repository/typeorm/role.schema.typeorm.impl';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { createRoleFakeData } from '../factories/role.factory.typeorm';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { SlugService } from '../../../../utils/slug/slugify';
import { faker } from '@faker-js/faker';

@Injectable()
export class RoleTypeormSeed {
  private slugService: SlugService;
  constructor(
    @InjectRepository(RoleSchemaTypeormImpl)
    private readonly roleRepository: Repository<RoleSchemaTypeormImpl>,
    @InjectRepository(UserSchemaTypeormImpl)
    private userRepository: Repository<UserSchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
    slugService: SlugService,
  ) {
    this.slugService = slugService;
  }

  public async run() {
    // const usersInDatabase: UserSchemaTypeormImpl[] =
    //   await this.userRepository.find();

    const usersInDatabase: UserSchemaTypeormImpl[] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getMany();

    const arrayLength: number = usersInDatabase.length;
    const randomIndex: number = Math.floor(Math.random() * arrayLength);
    const rolesInDatabase: RoleSchemaTypeormImpl[] =
      await this.roleRepository.find();
    const tenantSchema = usersInDatabase[randomIndex].tenant;
    // if (!tenantSchema) {
    //   return {};
    // }
    // const optionsFindOne: FindOneOptions<UserSchemaTypeormImpl> = {
    //   where: { superAdminId: '55de4944-8f8e-4a30-a4ec-1afad3ffa924' },
    //   // relations: ['tenant', 'createdBy'],
    // };
    // const tenantSchema: TenantSchemaTypeormImpl =
    //   await this.tenantRepository.findOne(optionsFindOne);
    const rolesFactory: Partial<RoleSchemaTypeormImpl>[] = [];
    for (let i = 0; i < 5; i++) {
      const roleSchema = await createRoleFakeData(
        this.userRepository,
        this.tenantRepository,
        new SlugService(),
      );
      rolesFactory.push(roleSchema);
    }
    if (rolesInDatabase.length < 1) {
      const label1 = 'gerente nivel 1';
      const baseSlug: string = label1 + ' - ' + tenantSchema.name;
      const rolesEntitiesSchemas: Partial<RoleSchemaTypeormImpl>[] = [
        {
          id: '9339b84e-4d36-4333-9fb9-8c916bc8d408',
          idCode: this.slugService.generateSlug(baseSlug),
          label: label1,
          icon: faker.random.word(),
          color: faker.internet.color(),
          description: 'gerente nivel 1 com acesso amplo',
          status: 'ACTIVE',
          createdBy: usersInDatabase[randomIndex],
          tenant: tenantSchema,
        },
        ...rolesFactory,
      ];
      await this.roleRepository.save(rolesEntitiesSchemas);
    } else {
      console.log(
        'SEEDs de role não foram executadas por ja existir registros',
      );
    }
  }
}
