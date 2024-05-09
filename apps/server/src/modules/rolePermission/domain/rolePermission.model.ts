import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Role } from '../../../modules/role/domain'

import { Permission } from '../../../modules/permission/domain'

@Entity()
export class RolePermission {
  @Column({})
  roleId: string

  @ManyToOne(() => Role, parent => parent.rolePermissions)
  @JoinColumn({ name: 'roleId' })
  role?: Role

  @Column({})
  permissionId: string

  @ManyToOne(() => Permission, parent => parent.rolePermissions)
  @JoinColumn({ name: 'permissionId' })
  permission?: Permission

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
