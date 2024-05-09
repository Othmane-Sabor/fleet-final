import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { VehicleDomainModule } from '../domain'
import { VehicleController } from './vehicle.controller'

import { VehicleTypeDomainModule } from '../../../modules/vehicleType/domain'

import { VehicleByVehicleTypeController } from './vehicleByVehicleType.controller'

import { DepartmentDomainModule } from '../../../modules/department/domain'

import { VehicleByDepartmentController } from './vehicleByDepartment.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    VehicleDomainModule,

    VehicleTypeDomainModule,

    DepartmentDomainModule,
  ],
  controllers: [
    VehicleController,

    VehicleByVehicleTypeController,

    VehicleByDepartmentController,
  ],
  providers: [],
})
export class VehicleApplicationModule {}
