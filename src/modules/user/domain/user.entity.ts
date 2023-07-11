import {
  getEnumKeyByValue,
  toEnum,
} from '../../../infra/utils/enum/enum-operations';
import { TenantEntity } from '../../tenant/domain/tenant.entity';
import { StatusUserEnum } from './enum/status-user.enum';

export class UserEntity {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _birthAt: Date;
  private _username: string;
  /**
   * fazer M:M da suporte para poder um gerente geral poder ter acesso a mais de um tenant
   * -
   * Tenant em que o usuário pertence
   */
  private _tenantEntity: TenantEntity;
  private _status: StatusUserEnum;
  private _createdBy?: UserEntity;

  private constructor(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    username?: string,
    birthAt?: Date,
    status?: StatusUserEnum,
    tenantEntity?: TenantEntity,
    createdBy?: UserEntity,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._birthAt = birthAt;
    this._username = username;
    this._status = status;
    this._tenantEntity = tenantEntity;
    this._createdBy = createdBy;
  }

  static factoryNewUser(
    name: string,
    email: string,
    username: string,
    password: string,
    functionHash: (password: string, salt: number) => string,
    birthAt: Date,
    createdBy: UserEntity,
    status?: StatusUserEnum,
    tenantEntity?: TenantEntity, // TODO: ao criar é obrigartio, ao atualizar nao pode
    // id?: string,
  ): UserEntity {
    const hashPassword: string = functionHash(password, 10);
    return new UserEntity(
      null,
      name,
      email,
      hashPassword,
      username,
      birthAt,
      status,
      tenantEntity,
      createdBy,
    );
  }

  static factoryUpdatePartialUser(
    id: string,
    name?: string,
    email?: string,
    username?: string,
    password?: string,
    birthAt?: Date,
    status?: StatusUserEnum,
    tenantEntity?: TenantEntity, // TODO: ao criar é obrigartio, ao atualizar nao pode
    createdBy?: UserEntity,
  ): UserEntity {
    return new UserEntity(
      id,
      name,
      email,
      password,
      username,
      birthAt,
      status,
      tenantEntity,
      createdBy,
    );
  }

  static factoryWithId(id: string): UserEntity {
    return new UserEntity(id);
  }

  isAdult(): boolean {
    const currentDate = new Date();
    const ageDifference =
      currentDate.getFullYear() - this.birthAt.getFullYear();
    return ageDifference >= 18;
  }

  validDateBirth(): void {
    // new ExceptionsService();
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get birthAt(): Date {
    return this._birthAt;
  }

  set birthAt(birthAt: Date) {
    this._birthAt = birthAt;
  }

  get status(): StatusUserEnum {
    return this._status;
  }

  set status(status: StatusUserEnum) {
    this._status = status;
  }

  get tenantEntity(): TenantEntity {
    return this._tenantEntity;
  }

  set tenantEntity(tenantEntity: TenantEntity) {
    this._tenantEntity = tenantEntity;
  }

  get createdBy(): UserEntity {
    return this._createdBy;
  }

  set createdByEntity(createdBy: UserEntity) {
    this._createdBy = createdBy;
  }

  /**
   * Lista de atributos que não podem ser atualizados
   * @returns
   */
  static blockUpdate() {
    return ['id', 'tenantEntity'];
  }

  static blockCreated() {
    return ['id', 'status'];
  }

  /**
   * Cada Tenant pode ter uma regra de negocio diferente de como será o valor padrão de inicio ao criar novo usuaria
   */
  // TODO: implementar feature-flag, step, design pattern Specification
  static defaultValueCreated() {
    return {
      status: getEnumKeyByValue(
        StatusUserEnum,
        toEnum('PENDING', StatusUserEnum),
      ),
      id: 'UUID_AUTOMATICALLY_GENERATED',
    };
  }
}
