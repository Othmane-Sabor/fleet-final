import { Vehicle } from '../vehicle'

export class Department {
  id: string

  name: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  vehicles?: Vehicle[]
}
