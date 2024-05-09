import { Notification } from '../notification'

import { Task } from '../task'

import { Maintenance } from '../maintenance'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  tasksAsAssignedUser?: Task[]

  maintenancesAsTechnician?: Maintenance[]
}
