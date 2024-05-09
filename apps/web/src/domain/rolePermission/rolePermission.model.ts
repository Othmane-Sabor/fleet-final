import { Role } from '../role'

import { Permission } from '../permission'

export class RolePermission {
  roleId: string

  role?: Role

  permissionId: string

  permission?: Permission

  id: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
