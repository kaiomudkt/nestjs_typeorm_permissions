import { IBaseSquema } from 'src/modules/base/domain/interfaces/base.squema.interface';
import { StatusTenantEnum } from './status-tenant.enum';

export interface ITenantSchema extends IBaseSquema {
  id?: string;
  name: string;
  status: StatusTenantEnum;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
