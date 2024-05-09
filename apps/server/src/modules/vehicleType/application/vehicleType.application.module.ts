import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { VehicleTypeDomainModule } from '../domain'
import { VehicleTypeController } from './vehicleType.controller'

@Module({
  imports: [AuthenticationDomainModule, VehicleTypeDomainModule],
  controllers: [VehicleTypeController],
  providers: [],
})
export class VehicleTypeApplicationModule {}
