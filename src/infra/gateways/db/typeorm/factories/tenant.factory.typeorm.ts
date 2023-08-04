import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { faker } from '@faker-js/faker';
import { TenantSchemaTypeormImpl } from '../../../../../modules/tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';

export async function createTenantFakeData(
  userRepository: Repository<UserSchemaTypeormImpl>,
): Promise<Partial<TenantSchemaTypeormImpl>> {
  const paragraphsCount = 1;
  const usersInDatabase: UserSchemaTypeormImpl[] = await userRepository.find();
  const arrayLength: number = usersInDatabase.length;
  const randomIndex: number = Math.floor(Math.random() * arrayLength);
  const description: string = faker.lorem.paragraphs(paragraphsCount);
  return {
    name: faker.company.name(),
    description: description,
    email: faker.internet.email(),
    status: 'ACTIVE',
    superAdmin: usersInDatabase[randomIndex],
    createdBy: usersInDatabase[randomIndex],
    foundationDateAt: faker.date.birthdate(),
  };
}
