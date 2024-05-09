import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RolePermissionDomainFacade } from '@server/modules/rolePermission/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RolePermissionApplicationEvent } from './rolePermission.application.event'
import { RolePermissionCreateDto } from './rolePermission.dto'

import { PermissionDomainFacade } from '../../permission/domain'

@Controller('/v1/permissions')
export class RolePermissionByPermissionController {
  constructor(
    private permissionDomainFacade: PermissionDomainFacade,

    private rolePermissionDomainFacade: RolePermissionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/permission/:permissionId/rolePermissions')
  async findManyPermissionId(
    @Param('permissionId') permissionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.permissionDomainFacade.findOneByIdOrFail(permissionId)

    const items = await this.rolePermissionDomainFacade.findManyByPermission(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/permission/:permissionId/rolePermissions')
  async createByPermissionId(
    @Param('permissionId') permissionId: string,
    @Body() body: RolePermissionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, permissionId }

    const item = await this.rolePermissionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<RolePermissionApplicationEvent.RolePermissionCreated.Payload>(
      RolePermissionApplicationEvent.RolePermissionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
