import { Vehicle } from '../vehicle'

export class Alert {
  id: string

  message: string

  criticality: string

  vehicleId: string

  vehicle?: Vehicle

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
