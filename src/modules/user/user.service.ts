import { Injectable } from '@nestjs/common';
import { UserUsecase } from './domain/user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { CreateUserRepoImpl } from './repository/typeorm/implementation/create-user.repo.impl';
import { FindByIdUserRepoImpl } from './repository/typeorm/implementation/find-by-id-user.repo.impl';
import { UserSchema } from './repository/typeorm/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private userUsecase: UserUsecase;
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {
    this.userUsecase = new UserUsecase(
      new CreateUserRepoImpl(this.userRepository),
      new FindByIdUserRepoImpl(this.userRepository),
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
