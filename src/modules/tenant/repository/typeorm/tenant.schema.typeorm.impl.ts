import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ITenantSchema } from '../../domain/tenant.schema.interface';
import { UserSchemaTypeormImpl } from '../../../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';

@Entity({ name: 'tenant' })
export class TenantSchemaTypeormImpl implements ITenantSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** users do tenant */
  @OneToMany(() => UserSchemaTypeormImpl, (user) => user.tenant)
  users: UserSchemaTypeormImpl[];

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'superAdminId' })
  superAdmin: UserSchemaTypeormImpl;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserSchemaTypeormImpl;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 500,
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
