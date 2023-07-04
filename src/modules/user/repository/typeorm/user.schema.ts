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
import { StatusUserEnum } from '../../domain/enum/status-user.enum';
import { IsEnum } from 'class-validator';
import { IUserSchema } from '../../domain/user.schema.interface';

@Entity({ name: 'user' })
export class UserSchema implements IUserSchema {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 127,
  })
  name: string;

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
  birthAt: string;

  @Column({ type: 'enum', enum: StatusUserEnum })
  @IsEnum(StatusUserEnum, { message: 'Invalid enum type (StatusUserEnum)' })
  status: StatusUserEnum;

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
