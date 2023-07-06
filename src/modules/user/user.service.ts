import { Injectable } from '@nestjs/common';
import { CreateUserUsecase } from './domain/usecase/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { CreateUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/create-user.typeorm.repo.impl';
import { FindByIdUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/find-by-id-user.typeorm.repo.impl';
import { UserTypeOrmSchemaImpl } from './repository/typeorm/implementation/schema/user.typeorm.schema.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByIdUserUsecase } from './domain/usecase/find-by-id-user.usecase';
// import { MultitenancyService } from '../multitenancy/multitenancy.service';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  private createUserUsecase: CreateUserUsecase;
  private findByIdUserUsecase: FindByIdUserUsecase;
  constructor(
    @InjectRepository(UserTypeOrmSchemaImpl)
    private readonly userRepository: Repository<UserTypeOrmSchemaImpl>,
    // private tenantService: MultitenancyService,
  ) {
    this.createUserUsecase = new CreateUserUsecase(
      new CreateUserTypeormRepoImpl(this.userRepository),
    );
    this.findByIdUserUsecase = new FindByIdUserUsecase(
      new FindByIdUserTypeormRepoImpl(this.userRepository),
    );
  }

  async create(createUserDto: CreateUserDto) {
    const data: any = await this.createUserUsecase.create({
      ...createUserDto,
      // subdomain: this.tenantService.subdomain,
    });
    // envio de email
    return data;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    // console.log(this.tenantService.subdomain); // TODO: obtem do payload do token qual é o tenancy
    return await this.findByIdUserUsecase.findById(id);
  }

  update(id: number, updatePatchUserDto: UpdatePatchUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
