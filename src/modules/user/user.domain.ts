import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDomain {
  id: string;
  name: string;
  email: string;
  password: string;
  birthAt: Date;

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
}
