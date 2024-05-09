import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { RoleDomainModule } from './role/domain'

import { PermissionDomainModule } from './permission/domain'

import { RolePermissionDomainModule } from './rolePermission/domain'

import { VehicleTypeDomainModule } from './vehicleType/domain'

import { DepartmentDomainModule } from './department/domain'

import { VehicleDomainModule } from './vehicle/domain'

import { TaskDomainModule } from './task/domain'

import { MaintenanceDomainModule } from './maintenance/domain'

import { AlertDomainModule } from './alert/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    RoleDomainModule,

    PermissionDomainModule,

    RolePermissionDomainModule,

    VehicleTypeDomainModule,

    DepartmentDomainModule,

    VehicleDomainModule,

    TaskDomainModule,

    MaintenanceDomainModule,

    AlertDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
