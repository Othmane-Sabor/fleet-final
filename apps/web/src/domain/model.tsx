import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Role as RoleModel } from './role/role.model'

import { Permission as PermissionModel } from './permission/permission.model'

import { RolePermission as RolePermissionModel } from './rolePermission/rolePermission.model'

import { VehicleType as VehicleTypeModel } from './vehicleType/vehicleType.model'

import { Department as DepartmentModel } from './department/department.model'

import { Vehicle as VehicleModel } from './vehicle/vehicle.model'

import { Task as TaskModel } from './task/task.model'

import { Maintenance as MaintenanceModel } from './maintenance/maintenance.model'

import { Alert as AlertModel } from './alert/alert.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Role extends RoleModel {}

  export class Permission extends PermissionModel {}

  export class RolePermission extends RolePermissionModel {}

  export class VehicleType extends VehicleTypeModel {}

  export class Department extends DepartmentModel {}

  export class Vehicle extends VehicleModel {}

  export class Task extends TaskModel {}

  export class Maintenance extends MaintenanceModel {}

  export class Alert extends AlertModel {}
}
