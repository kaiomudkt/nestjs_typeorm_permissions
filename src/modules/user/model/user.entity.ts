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
import { v4 as uuid } from 'uuid';
import { RoleEntity } from '../role/role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'user_role', // Nome da tabela pivot
    joinColumn: {
      name: 'user_id', // Nome da coluna de chave estrangeira para User
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id', // Nome da coluna de chave estrangeira para Role
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

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
