import { CreateRoleDto } from '../../dto/create-role.dto';
import { ICreateRoleRepository } from '../interfaces/repository/create-role.repository.interface';
import { RoleEntity } from '../role.entity';
import { IRoleSchema } from '../role.schema.interface';
import { ITenantSchema } from '../../../tenant/domain/tenant.schema.interface';
import { IUserSchema } from '../../../user/domain/user.schema.interface';

export class CreateRoleUsecase {
  private repository: ICreateRoleRepository<IRoleSchema>;
  constructor(repository: ICreateRoleRepository<IRoleSchema>) {
    this.repository = repository;
  }

  async create(
    data: CreateRoleDto,
    userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    },
  ) {
    // const roleEntity = RoleEntity.factoryNewRole();
    const tenantSchema: ITenantSchema = {
      id: userLoggedReq.tenantId,
      name: '',
      description: '',
      email: '',
      status: '',
      superAdmin: undefined,
      createdBy: undefined,
    };
    const userSchema: IUserSchema = {
      id: userLoggedReq.id,
      name: '',
      email: '',
      status: '',
      password: '',
      tenant: undefined,
    };
    const roleEntity = {
      idCode: data.idCode,
      tenant: tenantSchema,
      label: data.label,
      description: data.description,
      status: data.status,
      createdBy: userSchema,
      icon: data.icon,
      color: data.color,
    };
    const created = await this.repository.create(roleEntity);
    return created;
  }
}
