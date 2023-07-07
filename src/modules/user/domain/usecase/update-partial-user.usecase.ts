import { UserEntity } from '../user.entity';
import { UpdatePartialUserDto } from '../../dto/update-partial-user.dto';
import { IUpdatePartialUserRepository } from '../repository/interfaces/update-partial-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import {
  getEnumKeyByValue,
  toEnum,
} from '../../../../infra/utils/enum/enum-operations';

export class UpdatePartialUserUsecase {
  repository: IUpdatePartialUserRepository<IUserSchema>;
  constructor(repository: IUpdatePartialUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async updatePartial(userId: string, data: UpdatePartialUserDto) {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: login nao pode repetir indepedente de tenant
    // TODO: não pode atualizar tenantId
    console.log('toEnum', toEnum(data.status, StatusUserEnum));
    console.log('data', data);
    const userEntity = UserEntity.factory(
      data.name,
      data.email,
      data.login,
      data.password,
      new Date(data.birthAt),
      toEnum(data.status, StatusUserEnum),
      // '',
    );
    console.log('userEntity', userEntity);
    userEntity.validDateBirth();
    // TODO: start transaction
    const payload = {
      name: userEntity.name,
      email: userEntity.email,
      login: userEntity.login,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      status: getEnumKeyByValue(StatusUserEnum, userEntity.status),
      // id: userEntity.id,
    };
    console.log('payload', payload);
    const createdUser = this.repository.updatePartial(userId, payload);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
