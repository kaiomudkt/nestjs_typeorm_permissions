import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../repository/interfaces/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum, getEnumKeyByValue } from '../enum/status-user.enum';

export class CreateUserUsecase {
  repository: ICreateUserRepository<IUserSchema>;
  constructor(repository: ICreateUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async create(data: CreateUserDto) {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: login nao pode repetir indepedente de tenant
    const userEntity = UserEntity.factory(
      data.name,
      data.email,
      data.login,
      data.password,
      new Date(data.birthAt),
      data.tenant,
      StatusUserEnum.PENDING,
    );
    userEntity.validDateBirth();
    // TODO: transaction
    const payload = {
      name: userEntity.name,
      email: userEntity.email,
      login: userEntity.login,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      tenant: userEntity.tenant,
      status: getEnumKeyByValue(StatusUserEnum, userEntity.status),
      // id: userEntity.id,
    };
    const createdUser = this.repository.create(payload);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
