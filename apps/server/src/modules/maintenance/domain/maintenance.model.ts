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

import { Vehicle } from '../../../modules/vehicle/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  scheduleDate: string

  @Column({})
  status: string

  @Column({})
  type: string

  @Column({})
  vehicleId: string

  @ManyToOne(() => Vehicle, parent => parent.maintenances)
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: Vehicle

  @Column({})
  technicianId: string

  @ManyToOne(() => User, parent => parent.maintenancesAsTechnician)
  @JoinColumn({ name: 'technicianId' })
  technician?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
