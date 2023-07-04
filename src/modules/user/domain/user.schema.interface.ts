import { IBaseSquema } from 'src/modules/base/domain/interfaces/base.squema.interface';
import { StatusUserEnum } from './enum/status-user.enum';

export interface IUserSchema extends IBaseSquema {
  id?: string;
  name: string;
  email: string;
  birthAt: string;
  password: string;
  status: StatusUserEnum;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
