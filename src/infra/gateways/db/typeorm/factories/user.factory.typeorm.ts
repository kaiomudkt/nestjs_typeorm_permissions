// import { Factory, Seeder, define } from 'typeorm-seeding';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';

export function createUserFakeData(): Partial<UserSchemaTypeormImpl> {
  // const faker: any = Faker;
  // const fakeData = faker();
  const salt: string = process.env.BCRYPT_SALT || '10';
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    // password: faker.internet.password(),
    password: hashSync('123-abc.ABC', parseInt(salt)),
    status: 'ACTIVE',
    birthAt: faker.date.birthdate(),
    tenantId: '',
  };
}
