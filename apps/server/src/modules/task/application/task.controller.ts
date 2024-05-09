import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Task, TaskDomainFacade } from '@server/modules/task/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TaskApplicationEvent } from './task.application.event'
import { TaskCreateDto, TaskUpdateDto } from './task.dto'

@Controller('/v1/tasks')
export class TaskController {
  constructor(
    private eventService: EventService,
    private taskDomainFacade: TaskDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.taskDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TaskCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.taskDomainFacade.create(body)

    await this.eventService.emit<TaskApplicationEvent.TaskCreated.Payload>(
      TaskApplicationEvent.TaskCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:taskId')
  async findOne(@Param('taskId') taskId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.taskDomainFacade.findOneByIdOrFail(
      taskId,
      queryOptions,
    )

    return item
  }

  @Patch('/:taskId')
  async update(@Param('taskId') taskId: string, @Body() body: TaskUpdateDto) {
    const item = await this.taskDomainFacade.findOneByIdOrFail(taskId)

    const itemUpdated = await this.taskDomainFacade.update(
      item,
      body as Partial<Task>,
    )
    return itemUpdated
  }

  @Delete('/:taskId')
  async delete(@Param('taskId') taskId: string) {
    const item = await this.taskDomainFacade.findOneByIdOrFail(taskId)

    await this.taskDomainFacade.delete(item)

    return item
  }
}
