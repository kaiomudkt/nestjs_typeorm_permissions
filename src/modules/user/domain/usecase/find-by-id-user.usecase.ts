import { UserEntity } from '../user.entity';
import { IFindByIdUserRepository } from '../interfaces/repository/find-by-id-user.repository.interface';
import { IUserSchema } from '../user.schema.interface';

export class FindByIdUserUsecase {
  private repository: IFindByIdUserRepository<IUserSchema>;
  constructor(repository: IFindByIdUserRepository<IUserSchema>) {
    this.repository = repository;
  }

  async findById(id: string) {
    // const userEntity = UserEntity.factoryWithId(id);
    return await this.repository.findById(id);
  }
}
