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

import { User } from '../../../modules/user/domain'

import { Vehicle } from '../../../modules/vehicle/domain'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  description: string

  @Column({})
  dueDate: string

  @Column({})
  status: string

  @Column({})
  assignedUserId: string

  @ManyToOne(() => User, parent => parent.tasksAsAssignedUser)
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser?: User

  @Column({})
  vehicleId: string

  @ManyToOne(() => Vehicle, parent => parent.tasks)
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: Vehicle

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
