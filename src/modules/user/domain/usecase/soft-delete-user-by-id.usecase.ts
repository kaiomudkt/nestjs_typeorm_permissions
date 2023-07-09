import { ISoftDeleteUserByIdRepository } from '../interfaces/repository/soft-delete-user-by-id.repository.interface';
import { IUserSchema } from '../user.schema.interface';

export class SoftDeleteByIdUserUsecase {
  private repository: ISoftDeleteUserByIdRepository<IUserSchema>;
  constructor(repository: ISoftDeleteUserByIdRepository<IUserSchema>) {
    this.repository = repository;
  }

  async softDeleteById(id: string): Promise<void> {
    // const userEntity = UserEntity.factoryWithId(id);
    // TODO: verificar permissão do usuário logado
    // TODO: verifica se existe antes de deletar
    // TODO: soft delete cascade será necessario?
    await this.repository.softDeleteById(id);
  }
}
