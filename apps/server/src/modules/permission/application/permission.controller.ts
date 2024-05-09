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
  Permission,
  PermissionDomainFacade,
} from '@server/modules/permission/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PermissionApplicationEvent } from './permission.application.event'
import { PermissionCreateDto, PermissionUpdateDto } from './permission.dto'

@Controller('/v1/permissions')
export class PermissionController {
  constructor(
    private eventService: EventService,
    private permissionDomainFacade: PermissionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.permissionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PermissionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.permissionDomainFacade.create(body)

    await this.eventService.emit<PermissionApplicationEvent.PermissionCreated.Payload>(
      PermissionApplicationEvent.PermissionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:permissionId')
  async findOne(
    @Param('permissionId') permissionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.permissionDomainFacade.findOneByIdOrFail(
      permissionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:permissionId')
  async update(
    @Param('permissionId') permissionId: string,
    @Body() body: PermissionUpdateDto,
  ) {
    const item =
      await this.permissionDomainFacade.findOneByIdOrFail(permissionId)

    const itemUpdated = await this.permissionDomainFacade.update(
      item,
      body as Partial<Permission>,
    )
    return itemUpdated
  }

  @Delete('/:permissionId')
  async delete(@Param('permissionId') permissionId: string) {
    const item =
      await this.permissionDomainFacade.findOneByIdOrFail(permissionId)

    await this.permissionDomainFacade.delete(item)

    return item
  }
}
