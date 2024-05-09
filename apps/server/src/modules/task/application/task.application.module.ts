import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TaskDomainModule } from '../domain'
import { TaskController } from './task.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TaskByUserController } from './taskByUser.controller'

import { VehicleDomainModule } from '../../../modules/vehicle/domain'

import { TaskByVehicleController } from './taskByVehicle.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TaskDomainModule,

    UserDomainModule,

    VehicleDomainModule,
  ],
  controllers: [TaskController, TaskByUserController, TaskByVehicleController],
  providers: [],
})
export class TaskApplicationModule {}
