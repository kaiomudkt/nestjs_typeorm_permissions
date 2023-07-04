import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty()
  id: number;
  // @ApiProperty()
  // roles: ;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  birthAt: string;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(user: UserPresenter) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.login = user.login;
    this.birthAt = user.birthAt;
    this.createdate = user.createdate;
    this.updateddate = user.updateddate;
  }
}
