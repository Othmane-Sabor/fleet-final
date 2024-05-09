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

import { VehicleType } from '../../../modules/vehicleType/domain'

import { Department } from '../../../modules/department/domain'

import { Task } from '../../../modules/task/domain'

import { Maintenance } from '../../../modules/maintenance/domain'

import { Alert } from '../../../modules/alert/domain'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  licensePlate: string

  @Column({})
  model: string

  @ColumnNumeric({ type: 'numeric' })
  year: number

  @Column({})
  vehicleTypeId: string

  @ManyToOne(() => VehicleType, parent => parent.vehicles)
  @JoinColumn({ name: 'vehicleTypeId' })
  vehicleType?: VehicleType

  @Column({})
  departmentId: string

  @ManyToOne(() => Department, parent => parent.vehicles)
  @JoinColumn({ name: 'departmentId' })
  department?: Department

  @OneToMany(() => Task, child => child.vehicle)
  tasks?: Task[]

  @OneToMany(() => Maintenance, child => child.vehicle)
  maintenances?: Maintenance[]

  @OneToMany(() => Alert, child => child.vehicle)
  alerts?: Alert[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
