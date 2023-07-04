import { Injectable } from '@nestjs/common';

import { UserUsecase } from './domain/user.use-case';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from './repository/typeorm/user.schema';
import { Repository } from 'typeorm';
import { IBaseRepository } from '../base-domain-interfaces/base.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { CreateUserRepoImpl } from './repository/typeorm/implementation/create-user.repo.impl';
import { FindByIdUserRepoImpl } from './repository/typeorm/implementation/find-by-id-user.repo.impl';

@Injectable()
export class UserService {
  private userUsecase: UserUsecase;
  // TODO: emailService: EmailService,
  constructor() {
    this.userUsecase = new UserUsecase(
      new CreateUserRepoImpl(),
      new FindByIdUserRepoImpl(),
    );
  }

  async create(createUserDto: CreateUserDto) {
    const data: any = await this.userUsecase.create(createUserDto);
    // envio de email
    return data;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updatePatchUserDto: UpdatePatchUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
