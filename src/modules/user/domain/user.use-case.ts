import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ICreateUserRepository } from './repository-interfaces/create-user.repository.interface';
import { IFindByIdUserRepository } from './repository-interfaces/find-by-id-user.repository.interface'; 
import { IUserSchema } from './repository-interfaces/user.schema.interface'; 

export class UserUsecase {
  createUserRepository: ICreateUserRepository<IUserSchema>;
  findByIdUserRepository: IFindByIdUserRepository<IUserSchema>;
  constructor(
    createUserRepository: ICreateUserRepository<IUserSchema>,
    findByIdUserRepository: IFindByIdUserRepository<IUserSchema>,
  ) {
    this.createUserRepository = createUserRepository;
    this.findByIdUserRepository = findByIdUserRepository;
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
    this.createUserRepository.create(presenter);
  }
}
