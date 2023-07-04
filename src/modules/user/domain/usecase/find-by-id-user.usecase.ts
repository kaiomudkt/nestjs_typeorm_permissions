import { UserEntity } from '../user.entity';
import { IFindByIdUserRepository } from '../repository-interfaces/find-by-id-user.repository.interface';
import { IUserSchema } from '../repository-interfaces/user.schema.interface';

export class FindByIdUserUsecase {
  repository: IFindByIdUserRepository<IUserSchema>;
  constructor(repository: IFindByIdUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async findById(id: string) {
    // const userEntity = UserEntity.factoryWithId(id);
    return await this.repository.findById(id);
  }
}
