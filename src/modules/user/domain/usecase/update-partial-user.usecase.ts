import { UserEntity } from '../user.entity';
import { UpdatePartialUserDto } from '../../dto/update-partial-user.dto';
import { IUpdatePartialUserRepository } from '../interfaces/repository/update-partial-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import {
  getEnumKeyByValue,
  toEnum,
} from '../../../../infra/utils/enum/enum-operations';

export class UpdatePartialUserUsecase {
  private repository: IUpdatePartialUserRepository<IUserSchema>;
  constructor(repository: IUpdatePartialUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async updatePartial(userId: string, data: UpdatePartialUserDto) {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: username nao pode repetir indepedente de tenant
    // TODO: não pode atualizar tenantId
    let statusEnum = null;
    if (data.status) {
      statusEnum = toEnum(data.status, StatusUserEnum);
      if (!statusEnum || statusEnum == undefined) {
        // TODO: lançar exceção: Valor do status não foi identificado;
        return;
      }
    }
    const userEntity = UserEntity.factoryUpdatePartialUser(
      userId,
      data.name,
      data.email,
      data.username,
      data.password,
      new Date(data.birthAt),
      statusEnum,
      // '',
    );
    userEntity.validDateBirth();
    // TODO: start transaction
    const payload = {
      name: userEntity.name,
      email: userEntity.email,
      username: userEntity.username,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      status: getEnumKeyByValue(StatusUserEnum, userEntity.status),
      createdBy: null, // TODO
      tenant: null, // TODO
      // id: userEntity.id,
    };
    const createdUser = this.repository.updatePartial(userId, payload);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
