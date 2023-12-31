import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IRoleSchema } from '../../domain/role.schema.interface';
import { UserSchemaTypeormImpl } from '../../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { TenantSchemaTypeormImpl } from '../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { CapabilitySchemaTypeormImpl } from '../../modules/capability/repository/typeorm/capability.schema.typeorm.impl';

@Entity({ name: 'role' })
export class RoleSchemaTypeormImpl implements IRoleSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 127,
    unique: true,
  })
  idCode: string;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserSchemaTypeormImpl;

  @ManyToOne(() => TenantSchemaTypeormImpl, (tenant) => tenant.roles)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantSchemaTypeormImpl;

  @OneToMany(
    () => CapabilitySchemaTypeormImpl,
    (capability: CapabilitySchemaTypeormImpl) => capability.role,
  )
  capabilities: CapabilitySchemaTypeormImpl[];

  @Column({
    length: 255,
  })
  label: string;

  @Column({
    length: 255,
  })
  icon?: string;

  @Column({
    length: 255,
  })
  color?: string;

  @Column({
    length: 500,
  })
  description: string;

  @Column({ type: 'varchar', length: 127 })
  status: string;

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
