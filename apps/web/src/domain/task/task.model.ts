import { User } from '../user'

import { Vehicle } from '../vehicle'

export class Task {
  id: string

  description: string

  dueDate: string

  status: string

  assignedUserId: string

  assignedUser?: User

  vehicleId: string

  vehicle?: Vehicle

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
