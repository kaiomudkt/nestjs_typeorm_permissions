import { IBaseSquema } from '../../base/domain/interfaces/base.squema.interface';

export interface IUserSchema extends IBaseSquema {
  id?: string;
  name: string;
  email: string;
  status: string;
  password: string;
  birthAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
