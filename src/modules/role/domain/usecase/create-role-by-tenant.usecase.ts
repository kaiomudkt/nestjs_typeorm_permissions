import { CreateRoleDto } from '../../dto/create-role.dto';
import { ICreateRoleRepository } from '../interfaces/repository/create-role.repository.interface';
import { RoleEntity } from '../role.entity';
import { IRoleSchema } from '../role.schema.interface';
import { ITenantSchema } from '../../../tenant/domain/tenant.schema.interface';
import { IUserSchema } from '../../../user/domain/user.schema.interface';
import { SlugService } from '../../../../infra/utils/slug/slugify';

export class CreateRoleUsecase {
  private repository: ICreateRoleRepository<IRoleSchema>;
  private slugService: SlugService;
  constructor(
    repository: ICreateRoleRepository<IRoleSchema>,
    slugService: SlugService,
  ) {
    this.repository = repository;
    this.slugService = slugService;
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
      username: '',
    };
    const roleEntity = {
      idCode: data.idCode || this.slugService.generateSlug(data.label),
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
