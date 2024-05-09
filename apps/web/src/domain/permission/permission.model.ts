import { RolePermission } from '../rolePermission'

export class Permission {
  id: string

  name: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  rolePermissions?: RolePermission[]
}
