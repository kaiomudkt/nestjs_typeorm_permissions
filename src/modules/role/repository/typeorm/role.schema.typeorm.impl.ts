import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IRoleSchema } from '../../domain/role.schema.interface';
import { UserSchemaTypeormImpl } from '../../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { TenantSchemaTypeormImpl } from '../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';

@Entity({ name: 'user' })
export class RoleSchemaTypeormImpl implements IRoleSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 127,
  })
  IdCode: string;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'superAdminId' })
  superAdmin: UserSchemaTypeormImpl;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserSchemaTypeormImpl;

  @ManyToOne(() => TenantSchemaTypeormImpl, tenant => tenant.roles)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantSchemaTypeormImpl;

  @Column({
    length: 127,
  })
  label: string;

  @Column({
    length: 127, // TODO alterar length
  })
  description: string;

  @Column({ type: 'varchar', length: 127 })
  status: string;

  @Column({
    length: 127,
  })
  email: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  foundationDateAt?: Date;

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
