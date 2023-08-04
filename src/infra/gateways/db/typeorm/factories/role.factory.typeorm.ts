import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { faker } from '@faker-js/faker';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { RoleSchemaTypeormImpl } from '../../../../../modules/role/repository/typeorm/role.schema.typeorm.impl';
import { SlugService } from '../../../../utils/slug/slugify';

export async function createRoleFakeData(
  userRepository: Repository<UserSchemaTypeormImpl>,
  tenantRepository: Repository<TenantSchemaTypeormImpl>,
  slugService: SlugService,
) {
  const paragraphsCount = 1;
  // const usersInDatabase: UserSchemaTypeormImpl[] = await userRepository.find();
  const usersInDatabase: UserSchemaTypeormImpl[] = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.tenant', 'tenant')
    .getMany();
  const arrayLength: number = usersInDatabase.length;
  const randomIndex: number = Math.floor(Math.random() * arrayLength);
  const description: string = faker.lorem.paragraphs(paragraphsCount);
  const label = faker.company.name();
  const tenantSchema = usersInDatabase[randomIndex].tenant;
  if (!tenantSchema) {
    return {};
  }
  return {
    label: label,
    idCode: slugService.generateSlug(label + tenantSchema.name),
    icon: faker.random.word(),
    color: faker.internet.color(),
    description: description,
    status: 'ACTIVE',
    createdBy: usersInDatabase[randomIndex],
    tenant: tenantSchema,
  };
}
