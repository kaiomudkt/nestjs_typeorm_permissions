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
// import { StatusUserEnum } from '../../../../domain/enum/status-user.enum';
// import { Matches } from 'class-validator';
import { IUserSchema } from '../../../../domain/user.schema.interface';
import { TenantSchemaTypeormImpl } from '../../../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';
// import { StatusUserValidator } from '../StatusUser.validator';

@Entity({ name: 'user' })
export class UserSchemaTypeormImpl implements IUserSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(
  //   (): typeof TenantSchemaTypeormImpl => TenantSchemaTypeormImpl,
  //   (tenant: TenantSchemaTypeormImpl): any => tenant.users,
  // )
  // @JoinColumn({ name: 'tenantId' })
  @ManyToOne(
    () => TenantSchemaTypeormImpl,
    (tenant: TenantSchemaTypeormImpl): any => tenant.users,
  )
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantSchemaTypeormImpl;

  @ManyToOne(() => UserSchemaTypeormImpl)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserSchemaTypeormImpl;

  @Column({
    length: 127,
  })
  name: string;

  // @Matches(/^[A-Z_]+$/, { message: 'Invalid status format' })
  // TODO: @StatusUserValidator()
  @Column({ type: 'varchar', length: 127 })
  status: string;

  @Column({
    length: 127,
  })
  email: string;

  @Column({
    length: 127,
    unique: true,
  })
  username: string;

  @Column({
    length: 127,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt?: Date;

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
