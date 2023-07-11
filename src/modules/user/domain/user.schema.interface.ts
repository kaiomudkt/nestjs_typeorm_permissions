import { IBaseSquema } from '../../base/interfaces/domain/base.squema.interface';
import { ITenantSchema } from '../../tenant/domain/tenant.schema.interface';

export interface IUserSchema extends IBaseSquema {
  id?: string;
  name: string;
  email: string;
  status: string;
  password: string;
  tenant: ITenantSchema;
  createdBy?: IUserSchema;
  birthAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
