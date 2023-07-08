import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../repository/interfaces/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import { getEnumKeyByValue } from '../../../../infra/utils/enum/enum-operations';

export class CreateUserUsecase {
  private repository: ICreateUserRepository<IUserSchema>;
  constructor(repository: ICreateUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async create(data: CreateUserDto) {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: login nao pode repetir indepedente de tenant
    const tenantEntity = data.tenantId;
    const userEntity = UserEntity.factory(
      data.name,
      data.email,
      data.login,
      data.password,
      new Date(data.birthAt),
      StatusUserEnum.PENDING,
      tenantEntity,
    );
    userEntity.validDateBirth();
    // TODO: transaction
    const payload = {
      name: userEntity.name,
      email: userEntity.email,
      login: userEntity.login,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      tenantId: userEntity.tenantEntity, // TODO: passar somente id
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
