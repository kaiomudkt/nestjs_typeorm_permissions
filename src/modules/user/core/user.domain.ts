import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/infra/utils/exceptions/exceptions.service';
import { StatusUserEnum } from './core/enum/status-user.enum';

@Injectable()
export class UserDomain {
  id: string;
  name: string;
  email: string;
  password: string;
  birthAt: Date;
  status: StatusUserEnum;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    birthAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthAt = birthAt;
  }

  isAdult(): boolean {
    const currentDate = new Date();
    const ageDifference =
      currentDate.getFullYear() - this.birthAt.getFullYear();
    return ageDifference >= 18;
  }

  validDateBirth(): void {
    new ExceptionsService();
  }
}
