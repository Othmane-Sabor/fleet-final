import { Vehicle } from '../vehicle'

import { User } from '../user'

export class Maintenance {
  id: string

  scheduleDate: string

  status: string

  type: string

  vehicleId: string

  vehicle?: Vehicle

  technicianId: string

  technician?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
