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
  RolePermission,
  RolePermissionDomainFacade,
} from '@server/modules/rolePermission/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RolePermissionApplicationEvent } from './rolePermission.application.event'
import {
  RolePermissionCreateDto,
  RolePermissionUpdateDto,
} from './rolePermission.dto'

@Controller('/v1/rolePermissions')
export class RolePermissionController {
  constructor(
    private eventService: EventService,
    private rolePermissionDomainFacade: RolePermissionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.rolePermissionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RolePermissionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.rolePermissionDomainFacade.create(body)

    await this.eventService.emit<RolePermissionApplicationEvent.RolePermissionCreated.Payload>(
      RolePermissionApplicationEvent.RolePermissionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:rolePermissionId')
  async findOne(
    @Param('rolePermissionId') rolePermissionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.rolePermissionDomainFacade.findOneByIdOrFail(
      rolePermissionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:rolePermissionId')
  async update(
    @Param('rolePermissionId') rolePermissionId: string,
    @Body() body: RolePermissionUpdateDto,
  ) {
    const item =
      await this.rolePermissionDomainFacade.findOneByIdOrFail(rolePermissionId)

    const itemUpdated = await this.rolePermissionDomainFacade.update(
      item,
      body as Partial<RolePermission>,
    )
    return itemUpdated
  }

  @Delete('/:rolePermissionId')
  async delete(@Param('rolePermissionId') rolePermissionId: string) {
    const item =
      await this.rolePermissionDomainFacade.findOneByIdOrFail(rolePermissionId)

    await this.rolePermissionDomainFacade.delete(item)

    return item
  }
}
