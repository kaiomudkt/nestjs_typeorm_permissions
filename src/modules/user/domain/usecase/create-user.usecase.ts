import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../repository-interfaces/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';

export class CreateUserUsecase {
  repository: ICreateUserRepository<IUserSchema>;
  constructor(repository: ICreateUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async create(data: CreateUserDto) {
    const userEntity = UserEntity.factory(
      data.name,
      data.email,
      data.login,
      data.password,
      data.birthAt,
    );
    userEntity.validDateBirth();

    const presenter = {
      name: userEntity.name,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      email: userEntity.email,
      login: userEntity.login,
      status: userEntity.status,
    };
    this.repository.create(presenter);
  }
}
