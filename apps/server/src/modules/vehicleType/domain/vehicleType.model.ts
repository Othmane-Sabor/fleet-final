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
export class VehicleType {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  typeName: string

  @OneToMany(() => Vehicle, child => child.vehicleType)
  vehicles?: Vehicle[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
