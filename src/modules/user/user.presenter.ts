import { ApiProperty } from '@nestjs/swagger';
import { TodoM } from '../../../domain/model/todo';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  roles: ;
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

  constructor(todo: TodoM) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdate = todo.createdate;
    this.updateddate = todo.updateddate;
  }
}