import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IFindByIdUserRepository } from '../repository-interfaces/find-by-id-user.repository.interface';
import { IUserSchema } from '../repository-interfaces/user.schema.interface';

export class FindByIdUserUsecase {
  repository: IFindByIdUserRepository<IUserSchema>;
  constructor(repository: IFindByIdUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async findById(data: CreateUserDto) {
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
    this.repository.findById(presenter);
  }
}
