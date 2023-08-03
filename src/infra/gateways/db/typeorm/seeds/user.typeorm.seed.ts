import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { createUserFakeData } from '../factories/user.factory.typeorm';

@Injectable()
export class UserTypeormSeed {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepository: Repository<UserSchemaTypeormImpl>,
  ) {}

  public async run() {
    const usersInDatabase = await this.userRepository.find();
    const salt = process.env.BCRYPT_SALT || '10';
    const usersFactory: Partial<UserSchemaTypeormImpl>[] = [];
    for (let i = 0; i < 10; i++) {
      usersFactory.push(createUserFakeData());
    }
    if (usersInDatabase.length === 0) {
      // const teste123 = await createUserFakeData().createMany(10);
      const usersEntitiesSchemas: Partial<UserSchemaTypeormImpl>[] = [
        {
          id: '55de4944-8f8e-4a30-a4ec-1afad3ffa924',
          name: 'Usuário ROOT',
          status: 'ACTIVE',
          email: 'root@example.com',
          username: 'root@example.com',
          password: hashSync('123-abc.ABC', parseInt(salt)),
          birthAt: new Date('2023-01-02'),
          tenantId: '',
        },
        {
          id: '83eadcee-dbfa-4a5d-bb8d-b1f755246906',
          name: 'Usuário 1',
          status: 'ACTIVE',
          email: 'usuario1@example.com',
          username: 'usuario1@example.com',
          password: hashSync('123-abc.ABC', parseInt(salt)),
          birthAt: new Date('2023-01-02'),
          tenantId: '',
        },
        {
          id: '4c7a37e6-60c3-47bb-898a-124279e71778',
          name: 'Usuário 2',
          status: 'ACTIVE',
          email: 'usuario2@example.com',
          username: 'usuario2@example.com',
          password: hashSync('123-abc.ABC', parseInt(salt)),
          birthAt: new Date('2023-02-02'),
          tenantId: '',
        },
        ...usersFactory,
      ];
      await this.userRepository.save(usersEntitiesSchemas);
    } else {
      console.log(
        'SEEDs de usuário não foram executadas por ja existir registros',
      );
    }
  }
}
