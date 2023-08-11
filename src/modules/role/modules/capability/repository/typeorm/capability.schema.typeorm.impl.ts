import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSchemaTypeormImpl } from '../../../../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { RoleSchemaTypeormImpl } from '../../../../repository/typeorm/role.schema.typeorm.impl';
import { TenantSchemaTypeormImpl } from '../../../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Entity()
export class CapabilitySchemaTypeormImpl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  idCode: string;

  @Column({
    length: 255,
  })
  status: string;

  @ManyToOne(
    () => TenantSchemaTypeormImpl,
    (tenant: TenantSchemaTypeormImpl): any => tenant.users,
  )
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantSchemaTypeormImpl;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserSchemaTypeormImpl;

  @ManyToOne(
    () => RoleSchemaTypeormImpl,
    (role: RoleSchemaTypeormImpl) => role.capabilities,
  )
  role: RoleSchemaTypeormImpl;

  @ManyToOne(
    () => UserSchemaTypeormImpl,
    (user: UserSchemaTypeormImpl) => user.capabilities,
  )
  user: UserSchemaTypeormImpl;

  @Column({ type: 'timestamp', nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
