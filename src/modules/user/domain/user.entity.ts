import { getEnumKeyByValue, toEnum } from '../../../infra/utils/enum/enum-operations';
import { StatusUserEnum } from './enum/status-user.enum';

export class UserEntity {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _birthAt: Date;
  private _username: string;
  private _tenantEntity: string;
  private _status: StatusUserEnum;

  private constructor(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    username?: string,
    birthAt?: Date,
    status?: StatusUserEnum,
    tenantEntity?: string, // TODO: criar entity
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._birthAt = birthAt;
    this._username = username;
    this._status = status;
    this._tenantEntity = tenantEntity;
  }

  static factoryNewUser(
    name: string,
    email: string,
    username: string,
    password: string,
    birthAt: Date,
    status?: StatusUserEnum,
    tenantEntity?: string, // TODO: ao criar é obrigartio, ao atualizar nao pode
    id?: string,
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
    tenantEntity?: string, // TODO: ao criar é obrigartio, ao atualizar nao pode
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

  get tenantEntity(): string {
    return this._tenantEntity;
  }

  set tenantEntity(tenantEntity: string) {
    this._tenantEntity = tenantEntity;
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
