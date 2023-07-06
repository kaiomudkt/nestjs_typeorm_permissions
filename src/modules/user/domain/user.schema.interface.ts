import { IBaseSquema } from '../../base/domain/interfaces/base.squema.interface';

export interface IUserSchema extends IBaseSquema {
  id?: string;
  name: string;
  email: string;
  birthAt: string;
  status: string;
  password: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
