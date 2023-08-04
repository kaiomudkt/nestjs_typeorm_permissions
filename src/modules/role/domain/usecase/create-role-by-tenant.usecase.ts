import { CreateRoleDto } from '../../dto/create-role.dto';
import { ICreateRoleRepository } from '../interfaces/repository/create-role.repository.interface';
// import { RoleEntity } from '../role.entity';
import { IRoleSchema } from '../role.schema.interface';
import { ITenantSchema } from '../../../tenant/domain/tenant.schema.interface';
import { IUserSchema } from '../../../user/domain/user.schema.interface';
import { SlugService } from '../../../../infra/utils/slug/slugify';

export class CreateRoleUsecase {
  private repository: ICreateRoleRepository<IRoleSchema, ITenantSchema>;
  private slugService: SlugService;
  constructor(
    repository: ICreateRoleRepository<IRoleSchema, ITenantSchema>,
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
  ): Promise<IRoleSchema> {
    const tenantSchema: ITenantSchema = await this.repository.findTenantById(
      userLoggedReq.tenantId,
    );
    const userSchema: IUserSchema = {
      id: userLoggedReq.id,
      name: '',
      email: '',
      status: '',
      password: '',
      tenant: undefined,
      username: '',
    };
    const baseSlug: string = data.label + ' - ' + tenantSchema.name;
    const roleEntity = {
      idCode: data.idCode || this.slugService.generateSlug(baseSlug),
      tenant: tenantSchema,
      label: data.label,
      description: data.description,
      status: data.status,
      createdBy: userSchema,
      icon: data.icon,
      color: data.color,
    };
    const created: IRoleSchema = await this.repository.createRole(roleEntity);
    return created;
  }
}
