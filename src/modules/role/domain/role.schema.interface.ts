import { IBaseSquema } from '../../base/interfaces/domain/base.squema.interface';
import { ITenantSchema } from '../../tenant/domain/tenant.schema.interface';
import { IUserSchema } from '../../user/domain/user.schema.interface';

export interface IRoleSchema extends IBaseSquema {
  id?: string;
  idCode: string;
  tenant: ITenantSchema;
  label: string;
  description: string;
  status: string;
  createdBy: IUserSchema;
  icon?: string;
  color?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  // TODO: categories?: ICategorySchema[];
}
