import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { VehicleDomainFacade } from './vehicle.domain.facade'
import { Vehicle } from './vehicle.model'

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), DatabaseHelperModule],
  providers: [VehicleDomainFacade, VehicleDomainFacade],
  exports: [VehicleDomainFacade],
})
export class VehicleDomainModule {}
