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
// import { StatusUserEnum } from '../../../../domain/enum/status-user.enum';
// import { Matches } from 'class-validator';
import { IUserSchema } from '../../../../domain/user.schema.interface';
// import { StatusUserValidator } from '../StatusUser.validator';

@Entity({ name: 'user' })
export class UserSchemaTypeormImpl implements IUserSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string; // TODO: FK UUID

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
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
    unique: true,
  })
  login: string;

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
