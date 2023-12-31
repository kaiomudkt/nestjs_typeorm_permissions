import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import { SoftDeleteByIdUserUsecase } from './domain/usecase/soft-delete-user-by-id.usecase';
import { SoftDeleteByIdUserTypeormRepoImpl } from './repository/typeorm/implementation/repository/soft-delete-user-by-id.typeorm.repo.impl';
import { TenantSchemaTypeormImpl } from '../tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { UserLogged } from '../base/interfaces/dto/user-logged.interface';

@Injectable()
export class UserService {
  private createUserUsecase: CreateUserUsecase;
  private findByIdUserUsecase: FindByIdUserUsecase;
  private findAllUsersByTenantUsecase: FindAllUsersByTenantUsecase;
  private updatePartialUserUsecase: UpdatePartialUserUsecase;
  private softDeleteByIdUserUsecase: SoftDeleteByIdUserUsecase;

  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepositoryInstance: Repository<TenantSchemaTypeormImpl>,
  ) {
    this.createUserUsecase = new CreateUserUsecase(
      new CreateUserTypeormRepoImpl(
        this.userRepositoryInstance,
        this.tenantRepositoryInstance,
      ),
    );
    this.findByIdUserUsecase = new FindByIdUserUsecase(
      new FindByIdUserTypeormRepoImpl(this.userRepositoryInstance),
    );
    this.findAllUsersByTenantUsecase = new FindAllUsersByTenantUsecase(
      new FindAllUsersByTenantTypeormRepoImpl(this.userRepositoryInstance),
    );
    this.softDeleteByIdUserUsecase = new SoftDeleteByIdUserUsecase(
      new SoftDeleteByIdUserTypeormRepoImpl(this.userRepositoryInstance),
    );
    this.updatePartialUserUsecase = new UpdatePartialUserUsecase(
      new UpdatePartialUserTypeormRepoImpl(this.userRepositoryInstance),
    );
  }

  async create(
    createUserDto: CreateUserDto,
    userLoggedReq: UserLogged,
  ): Promise<IUserSchema | undefined> {
    if (!userLoggedReq) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const data: any = await this.createUserUsecase.create(
      createUserDto,
      userLoggedReq,
    );
    // TODO: serviço envio de email
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

  async findOne(id: string, userLoggedReq: UserLogged): Promise<IUserSchema> {
    if (!userLoggedReq) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    return await this.findByIdUserUsecase.findById(id);
  }

  async updatePartial(
    id: string,
    updatePartialUserDto: UpdatePartialUserDto,
    userLoggedReq: UserLogged,
  ): Promise<IUserSchema> {
    return await this.updatePartialUserUsecase.updatePartial(
      id,
      updatePartialUserDto,
      userLoggedReq,
    );
  }

  async remove(id: string): Promise<void> {
    return await this.softDeleteByIdUserUsecase.softDeleteById(id);
  }
}
