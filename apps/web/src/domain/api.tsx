import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { RoleApi } from './role/role.api'

import { PermissionApi } from './permission/permission.api'

import { RolePermissionApi } from './rolePermission/rolePermission.api'

import { VehicleTypeApi } from './vehicleType/vehicleType.api'

import { DepartmentApi } from './department/department.api'

import { VehicleApi } from './vehicle/vehicle.api'

import { TaskApi } from './task/task.api'

import { MaintenanceApi } from './maintenance/maintenance.api'

import { AlertApi } from './alert/alert.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Role extends RoleApi {}

  export class Permission extends PermissionApi {}

  export class RolePermission extends RolePermissionApi {}

  export class VehicleType extends VehicleTypeApi {}

  export class Department extends DepartmentApi {}

  export class Vehicle extends VehicleApi {}

  export class Task extends TaskApi {}

  export class Maintenance extends MaintenanceApi {}

  export class Alert extends AlertApi {}
}
