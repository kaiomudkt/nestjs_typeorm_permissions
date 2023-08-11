import { TenantEntity } from '../../../../tenant/domain/tenant.entity';
import { UserEntity } from '../../../../user/domain/user.entity';
import { RoleEntity } from '../../../domain/role.entity';
import { StatusCapabilityEnum } from './enum/status-capability.enum';

export class CapabilityEntity {
  private _id: string;
  private _name: string;
  private _idCode: string;
  private _user: UserEntity;
  private _role: RoleEntity;
  /**
   * fazer M:M da suporte para poder um gerente geral poder ter acesso a mais de um tenant
   */
  private _tenantEntity: TenantEntity;
  private _status: StatusCapabilityEnum;
  private _createdBy?: UserEntity;

  private constructor(
    id?: string,
    name?: string,
    idCode?: string,
    status?: StatusCapabilityEnum,
    tenantEntity?: TenantEntity,
    createdBy?: UserEntity,
    user?: UserEntity,
    role?: RoleEntity,
  ) {
    this._id = id;
    this._name = name;
    this._idCode = idCode;
    this._status = status;
    this._tenantEntity = tenantEntity;
    this._createdBy = createdBy;
    this._user = user;
    this._role = role;
  }

  static factoryWithId(id: string): CapabilityEntity {
    return new CapabilityEntity(id);
  }

  /**
   * Lista de atributos que não podem ser atualizados
   * @returns
   */
  static blockUpdate() {
    return ['id', 'tenantEntity'];
  }

  static blockCreated() {
    return ['id', 'status'];
  }

  // TODO: criar getters e setters
}
