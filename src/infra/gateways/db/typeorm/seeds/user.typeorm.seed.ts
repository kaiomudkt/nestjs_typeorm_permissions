import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserSchemaTypeormImpl } from '../../../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';

@Injectable()
export class NomeDaEntidadeSeed {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(NomeDaEntidadeRepository)
//     private nomeDaEntidadeRepository: NomeDaEntidadeRepository,
//   ) {}

  constructor(
    private connection: Connection,
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
  ) {}

  async run() {
    const userSchema = new UserSchemaTypeormImpl();
    userSchema.id = 'go8y53c6-d8ae-41d6-ae36-75f62c54502f';
    userSchema.tenantId = 'Exemplo';
    userSchema.status = 'ACTIVE';
    userSchema.name = 'joão zinho';
    userSchema.email = 'joao@gmail.com';
    userSchema.username = 'joao@gmail.com';
    userSchema.password = '123-abc.ABC';
    userSchema.birthAt = new Date('2023-01-02');
    await this.userRepositoryInstance.save(userSchema);
  }
}
