import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MaintenanceDomainFacade } from '@server/modules/maintenance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MaintenanceApplicationEvent } from './maintenance.application.event'
import { MaintenanceCreateDto } from './maintenance.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class MaintenanceByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private maintenanceDomainFacade: MaintenanceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/technician/:technicianId/maintenances')
  async findManyTechnicianId(
    @Param('technicianId') technicianId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(technicianId)

    const items = await this.maintenanceDomainFacade.findManyByTechnician(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/technician/:technicianId/maintenances')
  async createByTechnicianId(
    @Param('technicianId') technicianId: string,
    @Body() body: MaintenanceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, technicianId }

    const item = await this.maintenanceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MaintenanceApplicationEvent.MaintenanceCreated.Payload>(
      MaintenanceApplicationEvent.MaintenanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
