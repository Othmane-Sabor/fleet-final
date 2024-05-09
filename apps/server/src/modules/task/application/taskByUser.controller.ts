import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TaskDomainFacade } from '@server/modules/task/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TaskApplicationEvent } from './task.application.event'
import { TaskCreateDto } from './task.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TaskByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private taskDomainFacade: TaskDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/assignedUser/:assignedUserId/tasks')
  async findManyAssignedUserId(
    @Param('assignedUserId') assignedUserId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(assignedUserId)

    const items = await this.taskDomainFacade.findManyByAssignedUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/assignedUser/:assignedUserId/tasks')
  async createByAssignedUserId(
    @Param('assignedUserId') assignedUserId: string,
    @Body() body: TaskCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, assignedUserId }

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
