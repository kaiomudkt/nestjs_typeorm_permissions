import { Injectable } from '@nestjs/common';
import { StatusUserEnum } from './enum/status-user.enum';

@Injectable()
export class UserEntity {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _birthAt: string;
  private _status: StatusUserEnum;

  private constructor(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    birthAt?: string,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._birthAt = birthAt;
  }

  static factory(
    name: string,
    email: string,
    password: string,
    id?: string,
  ): UserEntity {
    return new UserEntity(id, name, email, password);
  }

  static factoryWithId(id: string): UserEntity {
    return new UserEntity(id);
  }

  isAdult(): boolean {
    const currentDate = new Date();
    const ageDifference =
      currentDate.getFullYear() - new Date(this.birthAt).getFullYear();
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

  get birthAt(): string {
    return this._birthAt;
  }

  set birthAt(birthAt: string) {
    this._birthAt = birthAt;
  }

  get status(): StatusUserEnum {
    return this._status;
  }

  set status(status: StatusUserEnum) {
    this._status = status;
  }
}
