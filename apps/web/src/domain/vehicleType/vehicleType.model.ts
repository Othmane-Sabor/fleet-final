import { Vehicle } from '../vehicle'

export class VehicleType {
  id: string

  typeName: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  vehicles?: Vehicle[]
}
