import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../repository/interfaces/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';

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
      data.subdomain,
      StatusUserEnum.PENDING,
      null,
    );
    userEntity.validDateBirth();

    // TODO: transaction
    this.repository.create(userEntity);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction

    // TODO: rollbackTransaction
    // return userEntity;
  }
}
