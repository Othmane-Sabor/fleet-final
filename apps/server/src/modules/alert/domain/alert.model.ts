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

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  message: string

  @Column({})
  criticality: string

  @Column({})
  vehicleId: string

  @ManyToOne(() => Vehicle, parent => parent.alerts)
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: Vehicle

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
