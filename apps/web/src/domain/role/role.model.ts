import { RolePermission } from '../rolePermission'

export class Role {
  id: string

  name: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  rolePermissions?: RolePermission[]
}
