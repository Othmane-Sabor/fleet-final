import { VehicleType } from '../vehicleType'

import { Department } from '../department'

import { Task } from '../task'

import { Maintenance } from '../maintenance'

import { Alert } from '../alert'

export class Vehicle {
  id: string

  licensePlate: string

  model: string

  year: number

  vehicleTypeId: string

  vehicleType?: VehicleType

  departmentId: string

  department?: Department

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  tasks?: Task[]

  maintenances?: Maintenance[]

  alerts?: Alert[]
}
