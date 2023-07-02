import { IGenericRepository } from 'src/infra/outsourced-service/db/crud-base.interface';
import { UserEntity } from './user.entity';

export abstract class IDataServices {
  abstract userTypeorm: IGenericRepository<UserEntity>;
  // abstract userMongoose: IGenericRepository<UserEntity>;
}
