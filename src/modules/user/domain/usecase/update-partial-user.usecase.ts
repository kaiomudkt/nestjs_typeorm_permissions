/**
 * regras que são aplicadas no usecase
 */
/**
 * regra 1: nao pode repetir 'email', 'cpf' do usuário por 'tenant'
 */
/**
 * regra 2: 'username' nao pode repetir indepedente de 'tenant'
 */
/**
 * regra 3: não pode atualizar 'tenantId'
 */
/**
 * regra 4: verificar se o usuárioLogado tem permissão de alterar o cadastro do usuárioInformado?
 * somente usuário ROOT do sistema pode acessar usuario de outro tenant
 * -
 * realm root "LESSOR_ROOT" tem usuarios de staff
 * como por exemplo o cargo de suporte de atendimento ao cliente
 */
import { UserEntity } from '../user.entity';
import { UpdatePartialUserDto } from '../../dto/update-partial-user.dto';
import { IUpdatePartialUserRepository } from '../interfaces/repository/update-partial-user.repository.interface';
import { IUserSchema, UserSchemaPartial } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import {
  getEnumKeyByValue,
  toEnum,
} from '../../../../infra/utils/enum/enum-operations';
import { hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserLogged } from '../../../base/interfaces/dto/user-logged.interface';

export class UpdatePartialUserUsecase {
  private repository: IUpdatePartialUserRepository<
    IUserSchema,
    UserSchemaPartial
  >;
  constructor(
    repository: IUpdatePartialUserRepository<IUserSchema, UserSchemaPartial>,
  ) {
    this.repository = repository;
  }

  async updatePartial(
    userIdToUpdate: string,
    data: UpdatePartialUserDto,
    userLoggedReq: UserLogged,
  ): Promise<IUserSchema> {
    const userToUpdate: IUserSchema = await this.repository.findUserById(
      userIdToUpdate,
    );
    // TODO: usuário logado pode ser do tenant 'LESSOR_ROOT', alem do proprio tenant
    if (!userLoggedReq.isLessorRoot && !userToUpdate.tenant) {
      throw new UnauthorizedException('Usuário logado não tem permissão');
    }
    console.log('userToUpdate', userToUpdate);
    console.log('userLoggedReq', userLoggedReq);
    if (userLoggedReq.tenantId != userToUpdate.tenant.id) {
      throw new UnauthorizedException('Usuário logado não tem permissão');
    }
    let statusEnum: StatusUserEnum = null;
    if (data.status) {
      statusEnum = toEnum(data.status, StatusUserEnum);
      if (!statusEnum || statusEnum == undefined) {
        throw new UnauthorizedException(
          'Valor informado do status do usuário não foi identificado',
        );
      }
    }
    const saltRounds: string = process.env.BCRYPT_SALT_ROUNDS;
    const userEntity = UserEntity.factoryUpdatePartialUser(
      userToUpdate.id,
      hashSync,
      parseInt(saltRounds, 10),
      data.name,
      data.email,
      data.username,
      data.password,
      new Date(data.birthAt),
      statusEnum,
      null,
      null,
    );
    if (data.birthAt) {
      userEntity.validDateBirth();
    }
    const payload: UserSchemaPartial = {};
    if (data.status) {
      payload.status = getEnumKeyByValue(StatusUserEnum, userEntity.status);
    }
    if (data.birthAt) {
      payload.birthAt = userEntity.birthAt;
    }
    if (data.password) {
      payload.password = userEntity.password;
    }
    if (data.username) {
      payload.username = userEntity.username;
    }
    if (data.email) {
      payload.email = userEntity.email;
    }
    if (data.password) {
      payload.password = userEntity.password;
    }
    if (data.name) {
      payload.name = userEntity.name;
    }
    // TODO: start transaction
    const createdUser: IUserSchema = await this.repository.updatePartial(
      userToUpdate.id,
      payload,
    );
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
