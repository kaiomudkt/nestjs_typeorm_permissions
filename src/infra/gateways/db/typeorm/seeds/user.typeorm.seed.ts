import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';

@Injectable()
export class UserTypeormSeed {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepository: Repository<UserSchemaTypeormImpl>,
  ) {}

  public async run() {
    const usersInDatabase = await this.userRepository.find();
    if (usersInDatabase.length === 0) {
      const usersEntitiesSchemas: Partial<UserSchemaTypeormImpl>[] = [
        {
          id: '83eadcee-dbfa-4a5d-bb8d-b1f755246906',
          name: 'Usuário 1',
          status: 'ACTIVE',
          email: 'usuario1@example.com',
          username: 'usuario1@example.com',
          password: '123-abc.ABC',
          birthAt: new Date('2023-01-02'),
        },
        {
          id: '4c7a37e6-60c3-47bb-898a-124279e71778',
          name: 'Usuário 2',
          status: 'ACTIVE',
          email: 'usuario2@example.com',
          username: 'usuario2@example.com',
          password: '123-abc.ABC',
          birthAt: new Date('2023-02-02'),
        },
      ];
      await this.userRepository.save(usersEntitiesSchemas);
    } else {
      console.log(
        'SEEDs de usuário não foram executadas por ja existir registros',
      );
    }
  }
}
