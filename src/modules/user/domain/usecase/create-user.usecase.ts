import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserRepository } from '../interfaces/repository/create-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';
import { StatusUserEnum } from '../enum/status-user.enum';
import { getEnumKeyByValue } from '../../../../infra/utils/enum/enum-operations';
import { hashSync } from 'bcrypt';
import { ITenantSchema } from '../../../tenant/domain/tenant.schema.interface';
import { TenantEntity } from '../../../tenant/domain/tenant.entity';
import { UnauthorizedException } from '@nestjs/common';

export class CreateUserUsecase {
  private repository: ICreateUserRepository<IUserSchema, ITenantSchema>;
  constructor(repository: ICreateUserRepository<IUserSchema, ITenantSchema>) {
    this.repository = repository;
  }

  async create(
    data: CreateUserDto,
    userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    },
  ): Promise<IUserSchema> {
    // TODO: em cada tenant nao pode repetir email, cpf
    // TODO: username nao pode repetir indepedente de tenant
    const tenantSchema: ITenantSchema = await this.repository.findTenantById(
      userLoggedReq.tenantId,
    );
    if (!tenantSchema) {
      throw new UnauthorizedException('Usuário logado não esta sem tenant');
    }
    const userSchema: IUserSchema = await this.repository.findUserById(
      userLoggedReq.id,
    );
    if (!tenantSchema) {
      throw new UnauthorizedException('Usuário logado não encontrado');
    }
    const salt = process.env.BCRYPT_SALT || '10';
    const userEntity = UserEntity.factoryNewUser(
      data.name,
      data.email,
      data.username,
      data.password,
      () => {
        return hashSync(data.password, parseInt(salt));
      },
      new Date(data.birthAt),
      null, // TODO: implementar usuario que criou, caso não auto cadastro
      StatusUserEnum.PENDING,
      TenantEntity.factoryOnlyId(tenantSchema.id),
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
    // const tenantSchema2: ITenantSchema = (userEntity.tenantEntity.id);
    const payload: IUserSchema = {
      name: userEntity.name,
      email: userEntity.email,
      username: userEntity.username,
      password: userEntity.password,
      birthAt: userEntity.birthAt,
      status: getEnumKeyByValue(StatusUserEnum, userEntity.status),
      createdBy: userSchema,
      tenant: tenantSchema,
      // tenant: null, // userEntity.tenantEntity.id, // TODO: tenantSchema
    };
    const createdUser: IUserSchema = await this.repository.create(payload);
    // TODO: registrar no BD categorias deste usuario
    // TODO: chamar outro modulo que registra esse relacionamento, sem precisar abrir transaction
    // TODO: commitTransaction
    // TODO: rollbackTransaction
    // return userEntity;
    return createdUser;
  }
}
