import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationRoleSubscriber } from './subscribers/notification.role.subscriber'

import { NotificationPermissionSubscriber } from './subscribers/notification.permission.subscriber'

import { NotificationRolePermissionSubscriber } from './subscribers/notification.rolePermission.subscriber'

import { NotificationVehicleTypeSubscriber } from './subscribers/notification.vehicleType.subscriber'

import { NotificationDepartmentSubscriber } from './subscribers/notification.department.subscriber'

import { NotificationVehicleSubscriber } from './subscribers/notification.vehicle.subscriber'

import { NotificationTaskSubscriber } from './subscribers/notification.task.subscriber'

import { NotificationMaintenanceSubscriber } from './subscribers/notification.maintenance.subscriber'

import { NotificationAlertSubscriber } from './subscribers/notification.alert.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationRoleSubscriber,

    NotificationPermissionSubscriber,

    NotificationRolePermissionSubscriber,

    NotificationVehicleTypeSubscriber,

    NotificationDepartmentSubscriber,

    NotificationVehicleSubscriber,

    NotificationTaskSubscriber,

    NotificationMaintenanceSubscriber,

    NotificationAlertSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
