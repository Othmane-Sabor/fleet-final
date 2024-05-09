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
import {
  Department,
  DepartmentDomainFacade,
} from '@server/modules/department/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DepartmentApplicationEvent } from './department.application.event'
import { DepartmentCreateDto, DepartmentUpdateDto } from './department.dto'

@Controller('/v1/departments')
export class DepartmentController {
  constructor(
    private eventService: EventService,
    private departmentDomainFacade: DepartmentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.departmentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DepartmentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.departmentDomainFacade.create(body)

    await this.eventService.emit<DepartmentApplicationEvent.DepartmentCreated.Payload>(
      DepartmentApplicationEvent.DepartmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:departmentId')
  async findOne(
    @Param('departmentId') departmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.departmentDomainFacade.findOneByIdOrFail(
      departmentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:departmentId')
  async update(
    @Param('departmentId') departmentId: string,
    @Body() body: DepartmentUpdateDto,
  ) {
    const item =
      await this.departmentDomainFacade.findOneByIdOrFail(departmentId)

    const itemUpdated = await this.departmentDomainFacade.update(
      item,
      body as Partial<Department>,
    )
    return itemUpdated
  }

  @Delete('/:departmentId')
  async delete(@Param('departmentId') departmentId: string) {
    const item =
      await this.departmentDomainFacade.findOneByIdOrFail(departmentId)

    await this.departmentDomainFacade.delete(item)

    return item
  }
}
