import { UserEntity } from '../../user/domain/user.entity';

export class TenantEntity {
  private _id?: string;
  private _name: string;
  private _description: string;
  private _email: string;
  private _status: string;
  private _superAdmin: UserEntity;
  private _createdBy: UserEntity;
  private _foundationDateAt?: Date;
  private _deletedAt?: Date;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  private constructor(
    id?: string,
    name?: string,
    description?: string,
    email?: string,
    status?: string,
    superAdmin?: UserEntity,
    createdBy?: UserEntity,
    foundationDateAt?: Date,
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._email = email;
    this._status = status;
    this._superAdmin = superAdmin;
    this._createdBy = createdBy;
    this._foundationDateAt = foundationDateAt;
    this._deletedAt = deletedAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static factoryOnlyId(id: string) {
    return new TenantEntity(id);
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get superAdmin(): UserEntity {
    return this._superAdmin;
  }

  set superAdmin(value: UserEntity) {
    this._superAdmin = value;
  }

  get createdBy(): UserEntity {
    return this._createdBy;
  }

  set createdBy(value: UserEntity) {
    this._createdBy = value;
  }

  get foundationDateAt(): Date | undefined {
    return this._foundationDateAt;
  }

  set foundationDateAt(value: Date | undefined) {
    this._foundationDateAt = value;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  set deletedAt(value: Date | undefined) {
    this._deletedAt = value;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }
}
