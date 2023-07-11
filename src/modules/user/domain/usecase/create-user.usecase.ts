import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../interfaces/repository/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import { getEnumKeyByValue } from '../../../../infra/utils/enum/enum-operations';
import { hashSync } from 'bcrypt';

export class CreateUserUsecase {
  private repository: ICreateUserRepository<IUserSchema>;
  constructor(repository: ICreateUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async create(data: CreateUserDto) {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: username nao pode repetir indepedente de tenant
    const tenantEntity = data.tenantId;
    const userEntity = UserEntity.factoryNewUser(
      data.name,
      data.email,
      data.username,
      data.password,
      () => {
        return hashSync(data.password, 10);
      },
      new Date(data.birthAt),
      null, // TODO: implementar usuario que criou, caso não auto cadastro
      StatusUserEnum.PENDING,
      tenantEntity,
    );
    userEntity.validDateBirth();

    // const duplicated = await this.repository.isEmailPerTenantOrUsernameDuplicated(
    //   'tenant_1',
    //   userEntity.email,
    //   userEntity.username,
    // );
    // if (duplicated) {
    //   // TODO: lançar exceção
    //   throw new Error('Usuário não encontrado');
    // }
    // TODO: transaction
    const payload = {
      name: userEntity.name,
      email: userEntity.email,
      username: userEntity.username,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      tenantId: userEntity.tenantEntity, // TODO: passar somente id
      status: getEnumKeyByValue(StatusUserEnum, userEntity.status),
      createdBy: null, // TODO
      tenant: null, // TODO
      // id: userEntity.id,
    };
    const createdUser = await this.repository.create(payload);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
