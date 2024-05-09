import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RolePermissionDomainFacade } from '@server/modules/rolePermission/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RolePermissionApplicationEvent } from './rolePermission.application.event'
import { RolePermissionCreateDto } from './rolePermission.dto'

import { RoleDomainFacade } from '../../role/domain'

@Controller('/v1/roles')
export class RolePermissionByRoleController {
  constructor(
    private roleDomainFacade: RoleDomainFacade,

    private rolePermissionDomainFacade: RolePermissionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/role/:roleId/rolePermissions')
  async findManyRoleId(
    @Param('roleId') roleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.roleDomainFacade.findOneByIdOrFail(roleId)

    const items = await this.rolePermissionDomainFacade.findManyByRole(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/role/:roleId/rolePermissions')
  async createByRoleId(
    @Param('roleId') roleId: string,
    @Body() body: RolePermissionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, roleId }

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
