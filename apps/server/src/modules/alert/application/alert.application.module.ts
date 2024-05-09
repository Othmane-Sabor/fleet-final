import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AlertDomainModule } from '../domain'
import { AlertController } from './alert.controller'

import { VehicleDomainModule } from '../../../modules/vehicle/domain'

import { AlertByVehicleController } from './alertByVehicle.controller'

@Module({
  imports: [AuthenticationDomainModule, AlertDomainModule, VehicleDomainModule],
  controllers: [AlertController, AlertByVehicleController],
  providers: [],
})
export class AlertApplicationModule {}
