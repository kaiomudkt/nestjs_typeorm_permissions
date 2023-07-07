import { Injectable } from '@nestjs/common';
import { CreateUserUsecase } from './domain/usecase/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial-user.dto';
import { CreateUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/create-user.typeorm.repo.impl';
import { FindByIdUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/find-by-id-user.typeorm.repo.impl';
import { UserSchemaTypeormImpl } from './repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByIdUserUsecase } from './domain/usecase/find-by-id-user.usecase';
import { FindAllUsersByTenantUsecase } from './domain/usecase/find-all-users-by-tenant.usecase';
import { FindAllUsersByTenantTypeormRepoImpl } from './repository/typeorm/implementation/repository/find-all-users-by-tenant.typeorm.repo.impl';
import { UpdatePartialUserUsecase } from './domain/usecase/update-partial-user.usecase';
import { IUserSchema } from './domain/user.schema.interface';
import { UpdatePartialUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/update-partial-user.typeorm.repo.impl';

@Injectable()
export class UserService {
  private createUserUsecase: CreateUserUsecase;
  private findByIdUserUsecase: FindByIdUserUsecase;
  private findAllUsersByTenantUsecase: FindAllUsersByTenantUsecase;
  private updatePartialUserUsecase: UpdatePartialUserUsecase;

  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
  ) {
    this.createUserUsecase = new CreateUserUsecase(
      new CreateUserTypeormRepoImpl(this.userRepositoryInstance),
    );
    this.findByIdUserUsecase = new FindByIdUserUsecase(
      new FindByIdUserTypeormRepoImpl(this.userRepositoryInstance),
    );
    this.findAllUsersByTenantUsecase = new FindAllUsersByTenantUsecase(
      new FindAllUsersByTenantTypeormRepoImpl(this.userRepositoryInstance),
    );
    // this.deleteUserByIdUsecase = new DeleteUserByIdUsecase(
    //   new DeleteUserByIdTypeormRepoImpl(this.userRepositoryInstance),
    // );
    this.updatePartialUserUsecase = new UpdatePartialUserUsecase(
      new UpdatePartialUserTypeormRepoImpl(this.userRepositoryInstance),
    );
  }

  async create(createUserDto: CreateUserDto) {
    const data: any = await this.createUserUsecase.create({
      ...createUserDto,
      // tenant: this.tenantService.tenant,
    });
    // envio de email
    return data;
  }

  async findAll(tenantId: string, page: number, limit: number) {
    const data = await this.findAllUsersByTenantUsecase.findAllUsersByTenant(
      tenantId,
      page,
      limit,
    );
    return data;
  }

  async findOne(id: string) {
    return await this.findByIdUserUsecase.findById(id);
  }

  async update(id: string, updatePartialUserDto: UpdatePartialUserDto) {
    return await this.updatePartialUserUsecase.updatePartial(
      id,
      updatePartialUserDto,
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
