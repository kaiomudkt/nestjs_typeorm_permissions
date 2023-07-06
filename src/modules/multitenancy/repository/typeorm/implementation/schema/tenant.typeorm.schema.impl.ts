import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { StatusTenantEnum } from '../../../../domain/enum/status-tenant.enum';
import { IsEnum } from 'class-validator';
import { IUserSchema } from '../../../../../user/domain/user.schema.interface';
import { ITenantSchema } from '../../../../domain/enum/tenant.schema.interface';

@Entity({ name: 'user' })
export class TenantTypeOrmSchemaImpl implements ITenantSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 127,
  })
  name: string;

  @Column({ type: 'enum', enum: StatusTenantEnum })
  @IsEnum(StatusTenantEnum, { message: 'Invalid enum type (StatusTenantEnum)' })
  status: StatusTenantEnum;

  @Column({ type: 'timestamp', nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
