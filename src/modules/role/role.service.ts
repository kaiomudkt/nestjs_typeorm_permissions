import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleSchemaTypeormImpl } from './repository/typeorm/role.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { CreateRoleUsecase } from './domain/usecase/create-role-by-tenant.usecase';
import { CreateRoleTypeormRepoImpl } from './repository/typeorm/implementation/create-role.typeorm.repo.impl';
import { FindAllRolesPayloadRepository } from './domain/interfaces/repository/find-all-roles-by.repository.interface';
import { FindAllRolesByTenantUsecase } from './domain/usecase/find-all-roles.usecase';
import { FindAllRolesByTenantTypeormRepoImpl } from './repository/typeorm/implementation/find-all-roles-by-tenant.typeorm.repo.impl';
import { SlugService } from '../../infra/utils/slug/slugify';

@Injectable()
export class RoleService {
  private createRoleUsecase: CreateRoleUsecase;
  private findAllRolesByTenantUsecase: FindAllRolesByTenantUsecase;

  constructor(
    @InjectRepository(RoleSchemaTypeormImpl)
    private readonly roleRepositoryInstance: Repository<RoleSchemaTypeormImpl>,
  ) {
    this.createRoleUsecase = new CreateRoleUsecase(
      new CreateRoleTypeormRepoImpl(this.roleRepositoryInstance),
      new SlugService(),
    );
    this.findAllRolesByTenantUsecase = new FindAllRolesByTenantUsecase(
      new FindAllRolesByTenantTypeormRepoImpl(this.roleRepositoryInstance),
    );
  }

  async create(
    createRoleDto: CreateRoleDto,
    userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    },
  ) {
    const data: any = await this.createRoleUsecase.create(
      {
        ...createRoleDto,
        // tenant: this.tenantService.tenant,
      },
      userLoggedReq,
    );
    // envio de email
    return data;
  }

  async findAll(findAllData: FindAllRolesPayloadRepository) {
    const data: any =
      await this.findAllRolesByTenantUsecase.findAllRolesByTenant(findAllData);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
