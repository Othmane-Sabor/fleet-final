import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MaintenanceDomainModule } from '../domain'
import { MaintenanceController } from './maintenance.controller'

import { VehicleDomainModule } from '../../../modules/vehicle/domain'

import { MaintenanceByVehicleController } from './maintenanceByVehicle.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { MaintenanceByUserController } from './maintenanceByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MaintenanceDomainModule,

    VehicleDomainModule,

    UserDomainModule,
  ],
  controllers: [
    MaintenanceController,

    MaintenanceByVehicleController,

    MaintenanceByUserController,
  ],
  providers: [],
})
export class MaintenanceApplicationModule {}
