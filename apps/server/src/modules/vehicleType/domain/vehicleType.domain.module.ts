import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { VehicleTypeDomainFacade } from './vehicleType.domain.facade'
import { VehicleType } from './vehicleType.model'

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType]), DatabaseHelperModule],
  providers: [VehicleTypeDomainFacade, VehicleTypeDomainFacade],
  exports: [VehicleTypeDomainFacade],
})
export class VehicleTypeDomainModule {}
