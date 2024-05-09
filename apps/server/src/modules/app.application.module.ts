import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { RoleApplicationModule } from './role/application'

import { PermissionApplicationModule } from './permission/application'

import { RolePermissionApplicationModule } from './rolePermission/application'

import { VehicleTypeApplicationModule } from './vehicleType/application'

import { DepartmentApplicationModule } from './department/application'

import { VehicleApplicationModule } from './vehicle/application'

import { TaskApplicationModule } from './task/application'

import { MaintenanceApplicationModule } from './maintenance/application'

import { AlertApplicationModule } from './alert/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    RoleApplicationModule,

    PermissionApplicationModule,

    RolePermissionApplicationModule,

    VehicleTypeApplicationModule,

    DepartmentApplicationModule,

    VehicleApplicationModule,

    TaskApplicationModule,

    MaintenanceApplicationModule,

    AlertApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
