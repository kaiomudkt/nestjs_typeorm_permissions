import { Injectable } from '@nestjs/common';
import { CreateUserUsecase } from './domain/usecase/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { CreateUserRepoImpl } from './repository/typeorm/implementation/create-user.repo.impl';
import { FindByIdUserRepoImpl } from './repository/typeorm/implementation/find-by-id-user.repo.impl';
import { UserSchema } from './repository/typeorm/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByIdUserUsecase } from './domain/usecase/find-by-id-user.usecase';

@Injectable()
export class UserService {
  private createUserUsecase: CreateUserUsecase;
  private findByIdUserUsecase: FindByIdUserUsecase;
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {
    this.createUserUsecase = new CreateUserUsecase(
      new CreateUserRepoImpl(this.userRepository),
    );
    this.findByIdUserUsecase = new FindByIdUserUsecase(
      new FindByIdUserRepoImpl(this.userRepository),
    );
  }

  async create(createUserDto: CreateUserDto) {
    const data: any = await this.createUserUsecase.create(createUserDto);
    // envio de email
    return data;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.findByIdUserUsecase.findById(id);
  }

  update(id: number, updatePatchUserDto: UpdatePatchUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
