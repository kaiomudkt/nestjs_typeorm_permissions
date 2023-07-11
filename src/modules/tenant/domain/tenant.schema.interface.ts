import { IBaseSquema } from '../../base/domain/interfaces/base.squema.interface';
import { IUserSchema } from '../../user/domain/user.schema.interface';
export interface ITenantSchema extends IBaseSquema {
  id?: string;
  name: string;
  description: string;
  email: string;
  status: string;
  superAdmin: IUserSchema;
  createdBy: IUserSchema;
  foundationDateAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
