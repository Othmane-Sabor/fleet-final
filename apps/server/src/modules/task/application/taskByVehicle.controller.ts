import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TaskDomainFacade } from '@server/modules/task/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TaskApplicationEvent } from './task.application.event'
import { TaskCreateDto } from './task.dto'

import { VehicleDomainFacade } from '../../vehicle/domain'

@Controller('/v1/vehicles')
export class TaskByVehicleController {
  constructor(
    private vehicleDomainFacade: VehicleDomainFacade,

    private taskDomainFacade: TaskDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/vehicle/:vehicleId/tasks')
  async findManyVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.vehicleDomainFacade.findOneByIdOrFail(vehicleId)

    const items = await this.taskDomainFacade.findManyByVehicle(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/vehicle/:vehicleId/tasks')
  async createByVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Body() body: TaskCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, vehicleId }

    const item = await this.taskDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TaskApplicationEvent.TaskCreated.Payload>(
      TaskApplicationEvent.TaskCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
